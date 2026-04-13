package org.hse.probujdenie.storage.content;

import org.hse.probujdenie.model.content.Course;
import org.hse.probujdenie.model.content.enums.CourseStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface CourseRepository extends JpaRepository<Course, UUID> {

    Page<Course> findAllByStatus(CourseStatus status, Pageable pageable);

    Optional<Course> findCourseByIdAndStatusNot(UUID courseId, CourseStatus status);

    @Query("""
        SELECT c FROM Course c
        WHERE c.status = :status
           AND EXISTS (
               SELECT 1 FROM StudentToCourse stc
               WHERE stc.course = c AND stc.user.email = :email
           )
    """)
    List<Course> getUserCourses(String email, CourseStatus status);

    @Query(value = """
        SELECT c.*
        FROM course c
        JOIN teacher_to_course ttc ON c.id = ttc.course_id
        WHERE ttc.teacher_email = :email AND ( NOT c.status = "DELETED")
    """, nativeQuery = true)
    List<Course> getTeacherCourses(@Param("email")String email, Pageable page);
}
