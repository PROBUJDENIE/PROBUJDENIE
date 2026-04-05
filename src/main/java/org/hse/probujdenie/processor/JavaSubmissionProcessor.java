package org.hse.probujdenie.processor;

import lombok.AllArgsConstructor;
import org.hse.probujdenie.model.exercise.StudentSubmission;
import org.hse.probujdenie.model.exercise.enums.StudentSubmissionStatus;
import org.hse.probujdenie.service.exercise.StudentSubmissionService;
import org.hse.probujdenie.util.ContainerExecutionResult;
import org.hse.probujdenie.util.DockerUtil;
import org.hse.probujdenie.util.FileUtil;
import org.springframework.stereotype.Service;

import java.io.*;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Optional;

import static org.hse.probujdenie.util.FileUtil.getSubmissionFolder;
import static org.hse.probujdenie.util.FileUtil.getSubmissionFolderAsFile;
import static org.hse.probujdenie.util.LogsUtil.getErrorsFromLogs;
import static org.hse.probujdenie.util.ProcessUtil.getProcessLogs;
import static org.hse.probujdenie.util.ProcessUtil.sendInputValuesToContainer;

@Service("javaSubmissionProcessor")
@AllArgsConstructor
public class JavaSubmissionProcessor implements LanguageSpecificProcessor {

    private final StudentSubmissionService studentSubmissionService;

    @Override
    public void processSubmission(StudentSubmission submission) throws IOException, InterruptedException {
        prepareDirectionForStudentSubmission(submission);
        int exitCode = createImage(submission);
        if (exitCode == 0) {
            ContainerExecutionResult containerExecutionResult = startContainer(submission);
            evaluateResult(submission, containerExecutionResult);
            DockerUtil.cleanupDanglingImages();
        }
    }

    private void prepareDirectionForStudentSubmission(StudentSubmission submission) throws IOException {
        Path submissionDir = getSubmissionFolder(submission.getId());
        Files.createDirectories(submissionDir);

        Path templateDir = Path.of("/app/submission-template");
        FileUtil.copyDirectory(templateDir, submissionDir);

        Path mainPath = submissionDir.resolve("src/main/java/org/hse/probujdenie/student/submission/Main.java");
        FileUtil.replaceFileContentFromLine(mainPath, 3, submission.getAnswer());
    }

    private int createImage(StudentSubmission submission) throws IOException, InterruptedException {
        Process process = executeBuildImageScript(submission);

        int exitCode = process.waitFor();
        String logs = getProcessLogs(process);

        if (exitCode != 0) {
            String errors = getErrorsFromLogs(logs);
            rejectSubmission(errors, submission);
        }
        DockerUtil.cleanupDanglingImages();
        return exitCode;
    }

    private ContainerExecutionResult startContainer(StudentSubmission submission) throws IOException, InterruptedException {
        Process process = executeRunningContainerScript(submission);

        String[] inputValues = submission.getExercise().getInputData().split(",");
        sendInputValuesToContainer(process, inputValues);

        int exitCode = process.waitFor();
        String logs = getProcessLogs(process);
        return ContainerExecutionResult.builder().exitCode(exitCode).logs(logs).build();
    }

    private void evaluateResult(StudentSubmission submission, ContainerExecutionResult containerExecutionResult) throws IOException {
        int exitCode = containerExecutionResult.getExitCode();
        String actualOutput = containerExecutionResult.getLogs();
        if (exitCode != 0) {
            String errors;
            if (exitCode == 124) {
                errors = "Превышение лимит времени.";
            }
            else {
                errors = actualOutput;
            }
            rejectSubmission(errors, submission);
        } else {
            String expectedOutput = submission.getExercise().getOutputData();
            if (expectedOutput.equals(actualOutput)) {
                approveSubmission(submission);
            } else {
                rejectSubmission(actualOutput + "!=" + expectedOutput, submission);
            }
        }
    }

    private Process executeBuildImageScript(StudentSubmission submission) throws IOException {
        ProcessBuilder p = new ProcessBuilder(
                "sh",
                "build-image.sh",
                submission.getId().toString()
        );
        p.directory(getSubmissionFolderAsFile(submission));
        p.redirectErrorStream(true);

        return p.start();
    }

    public Process executeRunningContainerScript(StudentSubmission submission) throws IOException {
        Integer timeout = Optional.ofNullable(submission.getExercise().getTimeLimit()).orElse(30);
        Integer memory = Optional.ofNullable(submission.getExercise().getMemoryLimit()).orElse(256);

        ProcessBuilder processBuilder = new ProcessBuilder(
                "sh",
                "start-container.sh",
                submission.getId().toString(),
                timeout.toString(),
                memory.toString()
        );
        processBuilder.directory(getSubmissionFolderAsFile(submission));
        processBuilder.redirectErrorStream(true);

        return processBuilder.start();
    }

    private void rejectSubmission(String errors, StudentSubmission submission) throws IOException {
        Path submissionDir = getSubmissionFolder(submission.getId());
        FileUtil.deleteDirectory(submissionDir);
        submission.setErrorDesc(errors);
        studentSubmissionService.setStatus(submission, StudentSubmissionStatus.REJECTED);
    }

    private void approveSubmission(StudentSubmission submission) throws IOException {
        Path submissionDir = getSubmissionFolder(submission.getId());
        FileUtil.deleteDirectory(submissionDir);
        studentSubmissionService.setStatus(submission, StudentSubmissionStatus.APPROVED);
    }
}
