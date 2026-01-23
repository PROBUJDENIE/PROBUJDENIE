package org.hse.probujdenie.service.content;

import lombok.RequiredArgsConstructor;
import org.hse.probujdenie.mapper.CourseMapper;
import org.hse.probujdenie.model.content.Course;
import org.hse.probujdenie.model.content.enums.CourseStatus;
import org.hse.probujdenie.storage.content.CourseRepository;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.hse.probujdenie.util.UuidService.generateId;

@Service
@RequiredArgsConstructor
public class CourseService {

    private final CourseRepository courseRepository;
    private final CourseMapper courseMapper;

    public void createCourse(Course course) {
        formCourse(course);
        courseRepository.save(course);
    }

    public void updateCourse(Course course) {
        Course existing = getCourse(course.getId());
        courseMapper.updateCourseFromDto(course, existing);
        courseRepository.save(existing);
    }

    public List<Course> getAllActualCourses(Integer offset, Integer count) {
        Pageable page = PageRequest.of(offset, count);
        return courseRepository.findAllByStatusNot(CourseStatus.DELETED, page).getContent();
    }

    public void deleteCourse(UUID id) {
        Course course = getCourse(id);
        course.setStatus(CourseStatus.DELETED);
        courseRepository.save(course);
    }

    public Course getCourse(UUID id) {
        Optional<Course> course = courseRepository.findCourseByIdAndStatusNot(id, CourseStatus.DELETED);
        if (course.isEmpty()) throw new IllegalArgumentException("Курс не существует.");
        return course.get();
    }

    private void formCourse(Course course) {
        course.setId(generateId());
        course.setCreationDateTime(LocalDateTime.now());
        course.setLastModificationDateTime(LocalDateTime.now());
        course.setStatus(CourseStatus.CREATED);
    }
}
