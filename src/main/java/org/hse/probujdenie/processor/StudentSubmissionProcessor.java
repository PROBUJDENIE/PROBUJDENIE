package org.hse.probujdenie.processor;

import org.hse.probujdenie.model.exercise.StudentSubmission;

import java.io.IOException;

public interface StudentSubmissionProcessor {

    void processSubmission(StudentSubmission submission) throws IOException, InterruptedException;
}
