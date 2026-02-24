package org.hse.probujdenie.service.content;

import lombok.RequiredArgsConstructor;
import org.hse.probujdenie.mapper.CourseMapper;
import org.hse.probujdenie.model.StudentToCourse;
import org.hse.probujdenie.model.content.Course;
import org.hse.probujdenie.model.content.enums.CourseStatus;
import org.hse.probujdenie.model.user.User;
import org.hse.probujdenie.service.UserService;
import org.hse.probujdenie.storage.StudentToCourseRepository;
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
    private final UserService userService;
    private final StudentToCourseRepository studentToCourseRepository;
    private final CourseMapper courseMapper;

    public void createCourse(Course course) {
        formCourse(course);
        courseRepository.save(course);
    }

    public void updateCourse(UUID courseId, Course course) {
        Course existing = getCourse(courseId);
        courseMapper.updateCourseFromDto(course, existing);
        courseRepository.save(existing);
    }

    public void updateCoursePhoto(UUID courseId, UUID photoId) {
        Course existing = getCourse(courseId);
        existing.setPhotoId(photoId);
        courseRepository.save(existing);
    }

    public List<Course> getAllReadyCourses(Integer offset, Integer count) {
        Pageable page = PageRequest.of(offset, count);
        return courseRepository.findAllByStatus(CourseStatus.READY, page).getContent();
    }

    public List<Course> getAllCoursesForAdmin(Integer offset, Integer count) {
        Pageable page = PageRequest.of(offset, count);
        return courseRepository.findAll(page).getContent();
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

    public List<Course> getUserCourses(String userEmail) {
        return courseRepository.getUserCourses(userEmail, CourseStatus.READY);
    }

    public void buyCourse(String userEmail, UUID courseId) {
        Course course = getCourse(courseId);
        User user = userService.getUserByEmail(userEmail);
        Optional<StudentToCourse> exist = studentToCourseRepository.findById(new StudentToCourse.StudentCourseId(userEmail, courseId));
        if (exist.isPresent()) throw new IllegalArgumentException("Курс уже куплен");
        StudentToCourse studentToCourse = StudentToCourse.builder().user(user).course(course).creationDateTime(LocalDateTime.now()).price(course.getPrice()).build();
        studentToCourseRepository.save(studentToCourse);
    }

    private void formCourse(Course course) {
        course.setId(generateId());
        course.setCreationDateTime(LocalDateTime.now());
        course.setLastModificationDateTime(LocalDateTime.now());
        course.setStatus(CourseStatus.CREATED);
    }
}
