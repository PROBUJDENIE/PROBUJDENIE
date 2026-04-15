package org.hse.probujdenie.service.content;

import org.hse.probujdenie.mapper.LectureMapper;
import org.hse.probujdenie.model.TeacherToCourse;
import org.hse.probujdenie.model.content.Course;
import org.hse.probujdenie.model.content.Lecture;
import org.hse.probujdenie.model.content.Section;
import org.hse.probujdenie.model.content.enums.LectureStatus;
import org.hse.probujdenie.storage.TeacherToCourseRepository;
import org.hse.probujdenie.storage.content.LectureRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class LectureServiceTest {

    @Mock
    private SectionService sectionService;

    @Mock
    private LectureRepository lectureRepository;

    @Mock
    private LectureMapper lectureMapper;

    @Mock
    private TeacherToCourseRepository teacherToCourseRepository;

    @InjectMocks
    private LectureService lectureService;

    private UUID lectureId;
    private UUID sectionId;
    private String email;

    private Course course;
    private Section section;
    private Lecture lecture;

    @BeforeEach
    void setUp() {
        lectureId = UUID.randomUUID();
        sectionId = UUID.randomUUID();
        email = "test@mail.com";

        course = new Course();
        course.setId(UUID.randomUUID());

        section = new Section();
        section.setId(sectionId);
        section.setCourse(course);

        lecture = new Lecture();
        lecture.setId(lectureId);
        lecture.setSection(section);
    }

    @Test
    void createLecture_shouldCreateWhenHasAccess() {
        when(sectionService.getSection(sectionId)).thenReturn(section);
        when(teacherToCourseRepository.findById(any()))
                .thenReturn(Optional.of(TeacherToCourse.builder().build()));

        Lecture result = lectureService.createLecture(sectionId, new Lecture(), email);

        assertEquals(LectureStatus.CREATED, result.getStatus());
        assertEquals(section, result.getSection());
        verify(lectureRepository).save(result);
    }

    @Test
    void createLecture_shouldThrowWhenNoAccess() {
        when(sectionService.getSection(sectionId)).thenReturn(section);
        when(teacherToCourseRepository.findById(any())).thenReturn(Optional.empty());

        assertThrows(
                IllegalArgumentException.class,
                () -> lectureService.createLecture(sectionId, new Lecture(), email)
        );

        verify(lectureRepository, never()).save(any());
    }

    @Test
    void createLectureAdmin_shouldCreate() {
        when(sectionService.getSection(sectionId)).thenReturn(section);

        Lecture result = lectureService.createLectureAdmin(sectionId, new Lecture());

        assertEquals(LectureStatus.CREATED, result.getStatus());
        assertEquals(section, result.getSection());
        verify(lectureRepository).save(result);
    }

    @Test
    void deleteLecture_shouldMarkDeletedWhenHasAccess() {
        when(lectureRepository.findLectureByIdAndStatusNot(lectureId, LectureStatus.DELETED))
                .thenReturn(Optional.of(lecture));
        when(teacherToCourseRepository.findById(any()))
                .thenReturn(Optional.of(TeacherToCourse.builder().build()));

        lectureService.deleteLecture(lectureId, email);

        assertEquals(LectureStatus.DELETED, lecture.getStatus());
        verify(lectureRepository).save(lecture);
    }

    @Test
    void deleteLecture_shouldThrowWhenNoAccess() {
        when(lectureRepository.findLectureByIdAndStatusNot(lectureId, LectureStatus.DELETED))
                .thenReturn(Optional.of(lecture));
        when(teacherToCourseRepository.findById(any())).thenReturn(Optional.empty());

        assertThrows(
                IllegalArgumentException.class,
                () -> lectureService.deleteLecture(lectureId, email)
        );
    }

    @Test
    void deleteLectureAdmin_shouldMarkDeleted() {
        when(lectureRepository.findLectureByIdAndStatusNot(lectureId, LectureStatus.DELETED))
                .thenReturn(Optional.of(lecture));

        lectureService.deleteLectureAdmin(lectureId);

        assertEquals(LectureStatus.DELETED, lecture.getStatus());
        verify(lectureRepository).save(lecture);
    }

    @Test
    void getAllLecturesBySectionId_shouldReturnList() {
        Lecture l1 = new Lecture();
        Lecture l2 = new Lecture();

        when(sectionService.getSection(sectionId)).thenReturn(section);
        when(lectureRepository.findAllBySectionIdAndStatusNot(eq(sectionId), eq(LectureStatus.DELETED), any(Pageable.class)))
                .thenReturn(new PageImpl<>(List.of(l1, l2)));

        List<Lecture> result = lectureService.getAllLecturesBySectionId(sectionId, 0, 10);

        assertEquals(2, result.size());
        assertEquals(List.of(l1, l2), result);
    }

    @Test
    void updateLecture_shouldUpdateWhenHasAccess() {
        when(lectureRepository.findLectureByIdAndStatusNot(lectureId, LectureStatus.DELETED))
                .thenReturn(Optional.of(lecture));
        when(teacherToCourseRepository.findById(any()))
                .thenReturn(Optional.of(TeacherToCourse.builder().build()));

        Lecture update = new Lecture();

        lectureService.updateLecture(lectureId, update, email);

        verify(lectureMapper).updateLectureFromDto(update, lecture);
        verify(lectureRepository).save(lecture);
    }

    @Test
    void updateLecture_shouldThrowWhenNoAccess() {
        when(lectureRepository.findLectureByIdAndStatusNot(lectureId, LectureStatus.DELETED))
                .thenReturn(Optional.of(lecture));
        when(teacherToCourseRepository.findById(any())).thenReturn(Optional.empty());

        assertThrows(
                IllegalArgumentException.class,
                () -> lectureService.updateLecture(lectureId, new Lecture(), email)
        );
    }

    @Test
    void updateLectureAdmin_shouldUpdate() {
        when(lectureRepository.findLectureByIdAndStatusNot(lectureId, LectureStatus.DELETED))
                .thenReturn(Optional.of(lecture));

        lectureService.updateLectureAdmin(lectureId, new Lecture());

        verify(lectureMapper).updateLectureFromDto(any(), eq(lecture));
        verify(lectureRepository).save(lecture);
    }

    @Test
    void getLecture_shouldReturnWhenExists() {
        when(lectureRepository.findLectureByIdAndStatusNot(lectureId, LectureStatus.DELETED))
                .thenReturn(Optional.of(lecture));

        Lecture result = lectureService.getLecture(lectureId);

        assertEquals(lecture, result);
    }

    @Test
    void getLecture_shouldThrowWhenNotFound() {
        when(lectureRepository.findLectureByIdAndStatusNot(lectureId, LectureStatus.DELETED))
                .thenReturn(Optional.empty());

        IllegalArgumentException ex = assertThrows(
                IllegalArgumentException.class,
                () -> lectureService.getLecture(lectureId)
        );

        assertEquals("Лекция не существует.", ex.getMessage());
    }

    @Test
    void updateLectureContent_shouldUpdateContentId() {
        UUID contentId = UUID.randomUUID();

        when(lectureRepository.findLectureByIdAndStatusNot(lectureId, LectureStatus.DELETED))
                .thenReturn(Optional.of(lecture));

        lectureService.updateLectureContent(lectureId, contentId, email);

        assertEquals(contentId, lecture.getContentId());
        verify(lectureRepository).save(lecture);
    }
}