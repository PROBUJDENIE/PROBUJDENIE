package org.hse.probujdenie.storage;

import org.hse.probujdenie.model.TeacherToCourse;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TeacherToCourseRepository extends JpaRepository<TeacherToCourse, TeacherToCourse.TeacherCourseId> {
}
