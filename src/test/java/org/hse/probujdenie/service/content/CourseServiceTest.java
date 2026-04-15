package org.hse.probujdenie.service.content;

import org.hse.probujdenie.mapper.CourseMapper;
import org.hse.probujdenie.model.StudentToCourse;
import org.hse.probujdenie.model.TeacherToCourse;
import org.hse.probujdenie.model.content.Course;
import org.hse.probujdenie.model.content.enums.CourseStatus;
import org.hse.probujdenie.model.user.User;
import org.hse.probujdenie.service.UserService;
import org.hse.probujdenie.storage.StudentToCourseRepository;
import org.hse.probujdenie.storage.TeacherToCourseRepository;
import org.hse.probujdenie.storage.content.CourseRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class CourseServiceTest {

    @Mock
    private CourseRepository courseRepository;

    @Mock
    private UserService userService;

    @Mock
    private StudentToCourseRepository studentToCourseRepository;

    @Mock
    private CourseMapper courseMapper;

    @Mock
    private TeacherToCourseRepository teacherToCourseRepository;

    @InjectMocks
    private CourseService courseService;

    private User user;
    private Course course;
    private UUID courseId;
    private String email;

    @BeforeEach
    void setUp() {
        courseId = UUID.randomUUID();
        email = "test@example.com";

        user = new User();
        user.setEmail(email);

        course = new Course();
        course.setId(courseId);
        course.setTitle("Java");
        course.setDescription("Course description");
        course.setPrice(BigDecimal.valueOf(1000));
        course.setStatus(CourseStatus.READY);
    }

    @Test
    void createCourse_shouldFillFieldsSaveCourseAndTeacherLink() {
        Course newCourse = new Course();
        when(userService.getUserByEmail(email)).thenReturn(user);

        Course result = courseService.createCourse(newCourse, email);

        assertNotNull(result.getId());
        assertEquals(CourseStatus.CREATED, result.getStatus());
        assertNotNull(result.getCreationDateTime());
        assertNotNull(result.getLastModificationDateTime());

        verify(courseRepository).save(newCourse);

        ArgumentCaptor<TeacherToCourse> captor = ArgumentCaptor.forClass(TeacherToCourse.class);
        verify(teacherToCourseRepository).save(captor.capture());

        TeacherToCourse savedLink = captor.getValue();
        assertEquals(user, savedLink.getUser());
        assertEquals(newCourse, savedLink.getCourse());
        assertNotNull(savedLink.getCreationDateTime());
    }

    @Test
    void updateCourse_withEmail_shouldUpdateWhenTeacherHasAccess() {
        Course existing = new Course();
        existing.setId(courseId);
        existing.setTitle("Old");

        Course update = new Course();
        update.setTitle("New");

        TeacherToCourse.TeacherCourseId key = new TeacherToCourse.TeacherCourseId(email, courseId);

        when(courseRepository.findCourseByIdAndStatusNot(courseId, CourseStatus.DELETED))
                .thenReturn(Optional.of(existing));
        when(teacherToCourseRepository.findById(key))
                .thenReturn(Optional.of(TeacherToCourse.builder().user(user).course(existing).build()));

        courseService.updateCourse(courseId, update, email);

        verify(courseMapper).updateCourseFromDto(update, existing);
        verify(courseRepository).save(existing);
    }

    @Test
    void updateCourse_withEmail_shouldThrowWhenTeacherHasNoAccess() {
        Course existing = new Course();
        existing.setId(courseId);

        TeacherToCourse.TeacherCourseId key = new TeacherToCourse.TeacherCourseId(email, courseId);

        when(courseRepository.findCourseByIdAndStatusNot(courseId, CourseStatus.DELETED))
                .thenReturn(Optional.of(existing));
        when(teacherToCourseRepository.findById(key)).thenReturn(Optional.empty());

        IllegalArgumentException ex = assertThrows(
                IllegalArgumentException.class,
                () -> courseService.updateCourse(courseId, new Course(), email)
        );

        assertEquals("У вас нет прав.", ex.getMessage());
        verify(courseMapper, never()).updateCourseFromDto(any(), any());
        verify(courseRepository, never()).save(existing);
    }

    @Test
    void updateCourse_withoutEmail_shouldUpdate() {
        Course existing = new Course();
        existing.setId(courseId);

        Course update = new Course();

        when(courseRepository.findCourseByIdAndStatusNot(courseId, CourseStatus.DELETED))
                .thenReturn(Optional.of(existing));

        courseService.updateCourse(courseId, update);

        verify(courseMapper).updateCourseFromDto(update, existing);
        verify(courseRepository).save(existing);
    }

    @Test
    void updateCoursePhoto_shouldUpdatePhotoId() {
        UUID photoId = UUID.randomUUID();
        Course existing = new Course();
        existing.setId(courseId);

        when(courseRepository.findCourseByIdAndStatusNot(courseId, CourseStatus.DELETED))
                .thenReturn(Optional.of(existing));

        courseService.updateCoursePhoto(courseId, photoId);

        assertEquals(photoId, existing.getPhotoId());
        verify(courseRepository).save(existing);
    }

    @Test
    void getAllReadyCourses_shouldReturnPageContent() {
        Course c1 = new Course();
        Course c2 = new Course();

        when(courseRepository.findAllByStatus(eq(CourseStatus.READY), any(Pageable.class)))
                .thenReturn(new PageImpl<>(List.of(c1, c2)));

        List<Course> result = courseService.getAllReadyCourses(0, 10);

        assertEquals(2, result.size());
        assertEquals(List.of(c1, c2), result);
    }

    @Test
    void getTeacherCourses_shouldReturnTeacherCourses() {
        Course c1 = new Course();
        Course c2 = new Course();

        when(courseRepository.getTeacherCourses(eq(email), any(Pageable.class)))
                .thenReturn(List.of(c1, c2));

        List<Course> result = courseService.getTeacherCourses(0, 10, email);

        assertEquals(2, result.size());
        assertEquals(List.of(c1, c2), result);
    }

    @Test
    void getAllCourses_shouldReturnAllCourses() {
        Course c1 = new Course();
        Course c2 = new Course();

        when(courseRepository.findAll()).thenReturn(List.of(c1, c2));

        List<Course> result = courseService.getAllCourses(0, 10);

        assertEquals(2, result.size());
        assertEquals(List.of(c1, c2), result);
        verify(courseRepository).findAll();
    }

    @Test
    void deleteCourse_shouldMarkDeletedWhenTeacherHasAccess() {
        Course existing = new Course();
        existing.setId(courseId);
        existing.setStatus(CourseStatus.READY);

        TeacherToCourse.TeacherCourseId key = new TeacherToCourse.TeacherCourseId(email, courseId);

        when(courseRepository.findCourseByIdAndStatusNot(courseId, CourseStatus.DELETED))
                .thenReturn(Optional.of(existing));
        when(teacherToCourseRepository.findById(key))
                .thenReturn(Optional.of(TeacherToCourse.builder().course(existing).user(user).build()));

        courseService.deleteCourse(courseId, email);

        assertEquals(CourseStatus.DELETED, existing.getStatus());
        verify(courseRepository).save(existing);
    }

    @Test
    void deleteCourse_shouldThrowWhenTeacherHasNoAccess() {
        Course existing = new Course();
        existing.setId(courseId);

        TeacherToCourse.TeacherCourseId key = new TeacherToCourse.TeacherCourseId(email, courseId);

        when(courseRepository.findCourseByIdAndStatusNot(courseId, CourseStatus.DELETED))
                .thenReturn(Optional.of(existing));
        when(teacherToCourseRepository.findById(key)).thenReturn(Optional.empty());

        IllegalArgumentException ex = assertThrows(
                IllegalArgumentException.class,
                () -> courseService.deleteCourse(courseId, email)
        );

        assertEquals("У вас нет прав.", ex.getMessage());
        verify(courseRepository, never()).save(any());
    }

    @Test
    void deleteCourseAdmin_shouldMarkDeleted() {
        Course existing = new Course();
        existing.setId(courseId);
        existing.setStatus(CourseStatus.READY);

        when(courseRepository.findCourseByIdAndStatusNot(courseId, CourseStatus.DELETED))
                .thenReturn(Optional.of(existing));

        courseService.deleteCourseAdmin(courseId);

        assertEquals(CourseStatus.DELETED, existing.getStatus());
        verify(courseRepository).save(existing);
    }

    @Test
    void getCourse_shouldReturnCourseWhenExists() {
        when(courseRepository.findCourseByIdAndStatusNot(courseId, CourseStatus.DELETED))
                .thenReturn(Optional.of(course));

        Course result = courseService.getCourse(courseId);

        assertEquals(course, result);
    }

    @Test
    void getCourse_shouldThrowWhenNotFound() {
        when(courseRepository.findCourseByIdAndStatusNot(courseId, CourseStatus.DELETED))
                .thenReturn(Optional.empty());

        IllegalArgumentException ex = assertThrows(
                IllegalArgumentException.class,
                () -> courseService.getCourse(courseId)
        );

        assertEquals("Курс не существует.", ex.getMessage());
    }

    @Test
    void getUserCourses_shouldReturnUserCourses() {
        Course c1 = new Course();
        Course c2 = new Course();

        when(courseRepository.getUserCourses(email, CourseStatus.READY))
                .thenReturn(List.of(c1, c2));

        List<Course> result = courseService.getUserCourses(email);

        assertEquals(2, result.size());
        assertEquals(List.of(c1, c2), result);
    }

    @Test
    void buyCourse_shouldSaveStudentToCourseWhenNotPurchased() {
        when(courseRepository.findCourseByIdAndStatusNot(courseId, CourseStatus.DELETED))
                .thenReturn(Optional.of(course));
        when(userService.getUserByEmail(email)).thenReturn(user);
        when(studentToCourseRepository.findById(new StudentToCourse.StudentCourseId(email, courseId)))
                .thenReturn(Optional.empty());

        courseService.buyCourse(email, courseId);

        ArgumentCaptor<StudentToCourse> captor = ArgumentCaptor.forClass(StudentToCourse.class);
        verify(studentToCourseRepository).save(captor.capture());

        StudentToCourse saved = captor.getValue();
        assertEquals(user, saved.getUser());
        assertEquals(course, saved.getCourse());
        assertEquals(course.getPrice(), saved.getPrice());
        assertNotNull(saved.getCreationDateTime());
    }

    @Test
    void buyCourse_shouldThrowWhenAlreadyPurchased() {
        when(courseRepository.findCourseByIdAndStatusNot(courseId, CourseStatus.DELETED))
                .thenReturn(Optional.of(course));
        when(userService.getUserByEmail(email)).thenReturn(user);
        when(studentToCourseRepository.findById(new StudentToCourse.StudentCourseId(email, courseId)))
                .thenReturn(Optional.of(StudentToCourse.builder().build()));

        IllegalArgumentException ex = assertThrows(
                IllegalArgumentException.class,
                () -> courseService.buyCourse(email, courseId)
        );

        assertEquals("Курс уже куплен", ex.getMessage());
        verify(studentToCourseRepository, never()).save(any());
    }
}