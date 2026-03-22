package org.hse.probujdenie.job;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.javacrumbs.shedlock.spring.annotation.SchedulerLock;
import org.hse.probujdenie.model.exercise.StudentSubmission;
import org.hse.probujdenie.service.exercise.StudentSubmissionService;
import org.hse.probujdenie.util.FileService;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;

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
    public void checkPendingSubmissions() throws IOException {
        List<StudentSubmission> submissions = studentSubmissionService.getAllSendedSubmissions();
        for (StudentSubmission submission: submissions) {

            if (JAVA.equals(submission.getExercise().getProgrammingLanguage())){
                Path submissionDir = Path.of("/app/student_submissions/", submission.getId().toString());
                Files.createDirectories(submissionDir);

                Path templateDir = Path.of("/app/submission-template");
                FileService.copyDirectory(templateDir, submissionDir);

                Path mainPath = submissionDir.resolve("src/main/java/org/hse/probujdenie/student/submission/Main.java");
                FileService.replaceFileContentFromLine(mainPath, 3, submission.getAnswer());

                // 2) Создать каталог (папку) с названием studentSubmission.id (+) (внутри каталога student_submissions в докере создавали)
                // 3) Копировать проект из ресурсов и положить внутрь этой папки (+)
                // 4) Заменить содержимое main со значением studentSubmission.answer (начиная с 3 строки - без импортов) (+)
                // 5) Запустить sh-скрипт для сборки образа для этого каталога (направить результат этого скрипта в файл build_log.log)
                // 6) Если скрипт успешно завершается (сборка образа успешна)
            }

        }
    }
}