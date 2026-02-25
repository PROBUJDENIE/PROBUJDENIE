package org.hse.probujdenie.storage.exercise;

import org.hse.probujdenie.model.exercise.Exercise;
import org.hse.probujdenie.model.exercise.enums.ExerciseStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface ExerciseRepository extends JpaRepository<Exercise, UUID> {
    List<Exercise> findAllByLectureIdAndStatus(UUID lectureId, ExerciseStatus status);

    Optional<Exercise> findExerciseByIdAndStatus(UUID id, ExerciseStatus status);
}
