package org.hse.probujdenie.job;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.javacrumbs.shedlock.spring.annotation.SchedulerLock;
import org.hse.probujdenie.model.exercise.StudentSubmission;
import org.hse.probujdenie.model.exercise.enums.StudentSubmissionStatus;
import org.hse.probujdenie.service.exercise.StudentSubmissionService;
import org.hse.probujdenie.util.DockerService;
import org.hse.probujdenie.util.FileService;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStreamWriter;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import static org.hse.probujdenie.model.exercise.enums.ProgrammingLanguage.JAVA;

@Slf4j
@Component
@AllArgsConstructor
public class SubmissionCheckJob {

    private final StudentSubmissionService studentSubmissionService;

    //TODO: 1) Проект доп положить в папку ресурсы (+)
    @SchedulerLock(
            name = "submissionCheckJob",
            lockAtMostFor = "${submission-check.lock-at-most-for}",
            lockAtLeastFor = "${submission-check.lock-at-least-for}"
    )
    @Scheduled(fixedDelayString = "${submission-check.fixed-delay-ms}")
    @Transactional
    public void checkPendingSubmissions() throws IOException, InterruptedException {
        List<StudentSubmission> submissions = studentSubmissionService.getAllSendedSubmissions();
        for (StudentSubmission submission: submissions) {

            if (JAVA.equals(submission.getExercise().getProgrammingLanguage())){
                prepareDirectionForStudentSubmission(submission);

                int code = startImage(submission);
                if (code != 0) return;

                startContainer(submission);

            }

        }

    }

    private void prepareDirectionForStudentSubmission(StudentSubmission submission) throws IOException {
        Path submissionDir = Path.of("/app/student_submissions/", submission.getId().toString());
        Files.createDirectories(submissionDir);

        Path templateDir = Path.of("/app/submission-template");
        FileService.copyDirectory(templateDir, submissionDir);

        Path mainPath = submissionDir.resolve("src/main/java/org/hse/probujdenie/student/submission/Main.java");
        FileService.replaceFileContentFromLine(mainPath, 3, submission.getAnswer());
    }

    private int startImage(StudentSubmission submission) throws IOException, InterruptedException {
        Process p = executeBuildImageScript(submission);

        int exitCode = p.waitFor();

        String logs;
        try (InputStream is = p.getInputStream()) {
            logs = new String(is.readAllBytes(), StandardCharsets.UTF_8);
        }

        if (exitCode != 0) {
            String errors = getErrorsFromLogs(logs);
            System.out.println("exit code != 0 in image");
            rejectSubmission(errors, submission);
            DockerService.cleanupDanglingImages();
        }
        return exitCode;
    }

    @Transactional
    private void startContainer(StudentSubmission submission) throws IOException, InterruptedException {
        Process p = executeRunningContainerScript(submission);

        String[] tests = submission.getExercise().getInputData().split(",");
        String answer = submission.getExercise().getOutputData();

        try (BufferedWriter writer = new BufferedWriter(
                new OutputStreamWriter(p.getOutputStream(), StandardCharsets.UTF_8))) {
            for (String value: tests) {
                writer.write(value + "\n");
            }

            writer.flush();
        }

        int exitCode = p.waitFor();

        String logs;
        try (InputStream is = p.getInputStream()) {
            logs = new String(is.readAllBytes(), StandardCharsets.UTF_8);
        }


        if (exitCode != 0) {
            String errors;
            if (exitCode == 124) {
                errors = "Превышение лимит времени.";
            }
            else {
                errors = logs;
            }
            rejectSubmission(errors, submission);
            DockerService.cleanupDanglingImages();
        } else {
            if (logs.equals(answer)) {
                approveSubmission(submission);
            } else {
                rejectSubmission(logs + "!=" + answer, submission);
            }
        }

    }


    private Process executeBuildImageScript(StudentSubmission submission) throws IOException {
        ProcessBuilder p = new ProcessBuilder(
                "sh",
                "build-image.sh",
                submission.getId().toString()
        );
        p.directory(Path.of("/app/student_submissions", submission.getId().toString()).toFile());
        p.redirectErrorStream(true);

        return p.start();
    }

    @Transactional
    private Process executeRunningContainerScript(StudentSubmission submission) throws IOException {
        Integer timeout = submission.getExercise().getTimeLimit();
        if (timeout == null) timeout = 30;

        Integer memory = submission.getExercise().getMemoryLimit();
        if (memory == null) memory = 256;

        ProcessBuilder p = new ProcessBuilder(
                "sh",
                "start-container.sh",
                submission.getId().toString(),
                timeout.toString(),
                memory.toString()
        );
        p.directory(Path.of("/app/student_submissions", submission.getId().toString()).toFile());
        p.redirectErrorStream(true);


        return p.start();
    }

    private String getErrorsFromLogs(String logs) {
        return logs.lines()
                .filter(line ->
                        line.contains("[ERROR]"))
                .reduce("", (a, b) -> a + b + System.lineSeparator());
    }


    private void rejectSubmission(String errors, StudentSubmission submission) throws IOException {
        Path submissionDir = Path.of("/app/student_submissions/", submission.getId().toString());
        submission.setErrorDesc(errors);
        submission.setStatus(StudentSubmissionStatus.REJECTED);
        FileService.deleteDirectory(submissionDir);
        studentSubmissionService.update(submission);
    }

    private void approveSubmission(StudentSubmission submission) throws IOException {
        Path submissionDir = Path.of("/app/student_submissions/", submission.getId().toString());
        submission.setStatus(StudentSubmissionStatus.APPROVED);
        FileService.deleteDirectory(submissionDir);
        studentSubmissionService.update(submission);
    }


}

// 1) заменяем id в скрипте
// 2) вызываем этот скрипт sh и перекидываем логи сборки в строку
//      2.1) если сборка успешна, не заполняем error_desc и переходим к шагу 3
//      2.2) если сборка не успешна:
//          2.2.1) заполняем лог сборки из шага 2.2 в error_desc
//          2.2.2) проставить статус REJECTED и сохраняем studentSubmission
//          2.2.3) удалить каталог, который был создан в строке 40-41
//          2.2.4) завершить обработку для текущего studentSubmission
// 3) запустить скрипт start-container.sh с передачей studentSubmission.id и перекидываем логи сборки в строку
//      3.1) если исполнение скрипта успешно, не заполняем error_desc и переходим к шагу 4
//      3.2) если исполнение скрипта не успешно:
//          3.2.1) заполняем лог исполнения скрипта из шага 3.2 в error_desc
//          3.2.2) проставить статус REJECTED и сохраняем studentSubmission
//          3.2.3) удалить каталог, который был создан в строке 40-41