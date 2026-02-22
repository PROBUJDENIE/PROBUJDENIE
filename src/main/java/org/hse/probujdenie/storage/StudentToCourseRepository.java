package org.hse.probujdenie.storage;

import org.hse.probujdenie.model.StudentToCourse;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentToCourseRepository extends JpaRepository<StudentToCourse, StudentToCourse.StudentCourseId> {
}
