package org.hse.probujdenie.processor;

import org.hse.probujdenie.model.exercise.StudentSubmission;
import org.hse.probujdenie.service.exercise.StudentSubmissionService;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.io.IOException;

import static org.hse.probujdenie.model.exercise.enums.ProgrammingLanguage.JAVA;

@Service
public class StudentSubmissionProcessorImpl implements StudentSubmissionProcessor {

    private final LanguageSpecificProcessor javaSubmissionProcessor;

    public StudentSubmissionProcessorImpl(@Qualifier("javaSubmissionProcessor") LanguageSpecificProcessor javaSubmissionProcessor) {
        this.javaSubmissionProcessor = javaSubmissionProcessor;
    }

    public void processSubmission(StudentSubmission submission) throws IOException, InterruptedException {
        if (JAVA.equals(submission.getExercise().getProgrammingLanguage())) {
            javaSubmissionProcessor.processSubmission(submission);
        }
    }
}
