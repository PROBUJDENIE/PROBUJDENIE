package org.hse.probujdenie.job;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.javacrumbs.shedlock.spring.annotation.SchedulerLock;
import org.hse.probujdenie.model.exercise.StudentSubmission;
import org.hse.probujdenie.model.exercise.enums.StudentSubmissionStatus;
import org.hse.probujdenie.processor.StudentSubmissionProcessor;
import org.hse.probujdenie.service.exercise.StudentSubmissionService;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.io.IOException;

import java.util.List;

@Slf4j
@Component
@AllArgsConstructor
public class SubmissionCheckJob {

    private final StudentSubmissionService studentSubmissionService;
    private final StudentSubmissionProcessor studentSubmissionProcessor;

    @SchedulerLock(
            name = "submissionCheckJob",
            lockAtMostFor = "${submission-check.lock-at-most-for}",
            lockAtLeastFor = "${submission-check.lock-at-least-for}"
    )
    @Scheduled(fixedDelayString = "${submission-check.fixed-delay-ms}")
    public void checkPendingSubmissions() throws IOException, InterruptedException {
        log.info("Начало обработки решений студентов");
        List<StudentSubmission> submissions = studentSubmissionService.getAllSendedSubmissions();
        for (StudentSubmission submission : submissions) {
            studentSubmissionService.setStatus(submission, StudentSubmissionStatus.IN_REVIEW);
            studentSubmissionProcessor.processSubmission(submission);
        }
        log.info("Конец обработки решений студентов");
    }
}
