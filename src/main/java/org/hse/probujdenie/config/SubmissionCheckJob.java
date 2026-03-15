package org.hse.probujdenie.config;

import lombok.AllArgsConstructor;
import net.javacrumbs.shedlock.spring.annotation.SchedulerLock;
import org.hse.probujdenie.model.exercise.StudentSubmission;
import org.hse.probujdenie.service.exercise.StudentSubmissionService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@AllArgsConstructor
public class SubmissionCheckJob {

    private final StudentSubmissionService studentSubmissionService;
    private static final Logger log = LoggerFactory.getLogger(SubmissionCheckJob.class);

    @Scheduled(fixedDelay = 30_000)
    @SchedulerLock(
            name = "submissionCheckJob",
            lockAtMostFor = "5m",
            lockAtLeastFor = "30s"
    )
    public void checkPendingSubmissions() {
        List<StudentSubmission> submissions = studentSubmissionService.getAllSendedSubmissions();
        for (StudentSubmission submission: submissions) {
            log.info(submission.toString());
        }
    }
}