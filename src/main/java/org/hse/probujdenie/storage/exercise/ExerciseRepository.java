package org.hse.probujdenie.storage.exercise;

import org.hse.probujdenie.model.exercise.Exercise;
import org.hse.probujdenie.model.exercise.enums.ExerciseStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface ExerciseRepository extends JpaRepository<Exercise, UUID> {
    @Query(value = """
        SELECT e.*
        FROM exercise e
        JOIN exercise_to_course etc ON e.id = etc.exercise_id
        WHERE etc.course_id = :courseId AND e.status = :status
    """, nativeQuery = true)
    List<Exercise> findAllByCourseIdAndStatus(UUID courseId, String status);

    Optional<Exercise> findExerciseByIdAndStatus(UUID id, ExerciseStatus status);
}
