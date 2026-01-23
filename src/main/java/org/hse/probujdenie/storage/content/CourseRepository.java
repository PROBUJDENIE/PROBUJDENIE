package org.hse.probujdenie.storage.content;

import org.hse.probujdenie.model.content.Course;
import org.hse.probujdenie.model.content.enums.CourseStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface CourseRepository extends JpaRepository<Course, UUID> {

    Page<Course> findAllByStatusNot(CourseStatus status, Pageable pageable);

    Optional<Course> findCourseByIdAndStatusNot(UUID courseId, CourseStatus status);
}
