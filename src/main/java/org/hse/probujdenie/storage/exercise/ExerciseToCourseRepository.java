package org.hse.probujdenie.storage.exercise;

import org.hse.probujdenie.ExerciseToCourse;
import org.hse.probujdenie.model.TeacherToCourse;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExerciseToCourseRepository extends JpaRepository<ExerciseToCourse, ExerciseToCourse.ExerciseCourseId> {
}
