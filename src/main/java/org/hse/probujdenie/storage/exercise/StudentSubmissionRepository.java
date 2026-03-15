package org.hse.probujdenie.storage.exercise;

import org.hse.probujdenie.model.exercise.StudentSubmission;
import org.hse.probujdenie.model.exercise.enums.StudentSubmissionStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface StudentSubmissionRepository extends JpaRepository<StudentSubmission, UUID> {

    Optional<StudentSubmission> findByExerciseIdAndStudentEmail(UUID exerciseId, String email);
    List<StudentSubmission> findAllByStatus(StudentSubmissionStatus status);
}
