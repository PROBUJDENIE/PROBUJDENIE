package org.hse.probujdenie.service.content;

import org.hse.probujdenie.mapper.SectionMapper;
import org.hse.probujdenie.model.TeacherToCourse;
import org.hse.probujdenie.model.content.Course;
import org.hse.probujdenie.model.content.Section;
import org.hse.probujdenie.model.content.enums.SectionStatus;
import org.hse.probujdenie.storage.TeacherToCourseRepository;
import org.hse.probujdenie.storage.content.SectionRepository;
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
class SectionServiceTest {

    @Mock
    private CourseService courseService;

    @Mock
    private SectionRepository sectionRepository;

    @Mock
    private SectionMapper sectionMapper;

    @Mock
    private TeacherToCourseRepository teacherToCourseRepository;

    @InjectMocks
    private SectionService sectionService;

    private UUID courseId;
    private UUID sectionId;
    private String email;
    private Course course;
    private Section section;

    @BeforeEach
    void setUp() {
        courseId = UUID.randomUUID();
        sectionId = UUID.randomUUID();
        email = "test@mail.com";

        course = new Course();
        course.setId(courseId);

        section = new Section();
        section.setId(sectionId);
        section.setCourse(course);
    }

    @Test
    void createSection_shouldCreateWhenTeacherHasAccess() {
        when(courseService.getCourse(courseId)).thenReturn(course);
        when(teacherToCourseRepository.findById(any()))
                .thenReturn(Optional.of(TeacherToCourse.builder().course(course).build()));

        Section result = sectionService.createSection(courseId, new Section(), email);

        assertNotNull(result.getId());
        assertEquals(SectionStatus.CREATED, result.getStatus());
        assertEquals(course, result.getCourse());

        verify(sectionRepository).save(result);
    }

    @Test
    void createSection_shouldThrowWhenNoAccess() {
        when(courseService.getCourse(courseId)).thenReturn(course);
        when(teacherToCourseRepository.findById(any())).thenReturn(Optional.empty());

        IllegalArgumentException ex = assertThrows(
                IllegalArgumentException.class,
                () -> sectionService.createSection(courseId, new Section(), email)
        );

        assertEquals("У вас нет прав.", ex.getMessage());
        verify(sectionRepository, never()).save(any());
    }

    @Test
    void createSectionAdmin_shouldCreateWithoutAccessCheck() {
        when(courseService.getCourse(courseId)).thenReturn(course);

        Section result = sectionService.createSectionAdmin(courseId, new Section());

        assertEquals(SectionStatus.CREATED, result.getStatus());
        assertEquals(course, result.getCourse());
        verify(sectionRepository).save(result);
    }

    @Test
    void updateSection_shouldUpdateWhenHasAccess() {
        Section existing = new Section();
        existing.setId(sectionId);
        existing.setCourse(course);

        when(sectionRepository.findSectionByIdAndStatusNot(sectionId, SectionStatus.DELETED))
                .thenReturn(Optional.of(existing));
        when(teacherToCourseRepository.findById(any()))
                .thenReturn(Optional.of(TeacherToCourse.builder().course(course).build()));

        Section update = new Section();

        sectionService.updateSection(sectionId, update, email);

        verify(sectionMapper).updateCourseFromDto(update, existing);
        verify(sectionRepository).save(existing);
    }

    @Test
    void updateSection_shouldThrowWhenNoAccess() {
        Section existing = new Section();
        existing.setId(sectionId);
        existing.setCourse(course);

        when(sectionRepository.findSectionByIdAndStatusNot(sectionId, SectionStatus.DELETED))
                .thenReturn(Optional.of(existing));
        when(teacherToCourseRepository.findById(any())).thenReturn(Optional.empty());

        IllegalArgumentException ex = assertThrows(
                IllegalArgumentException.class,
                () -> sectionService.updateSection(sectionId, new Section(), email)
        );

        assertEquals("У вас нет прав.", ex.getMessage());
    }

    @Test
    void updateSectionAdmin_shouldUpdate() {
        Section existing = new Section();
        existing.setId(sectionId);

        when(sectionRepository.findSectionByIdAndStatusNot(sectionId, SectionStatus.DELETED))
                .thenReturn(Optional.of(existing));

        sectionService.updateSectionAdmin(sectionId, new Section());

        verify(sectionMapper).updateCourseFromDto(any(), eq(existing));
        verify(sectionRepository).save(existing);
    }

    @Test
    void deleteSection_shouldMarkDeletedWhenHasAccess() {
        Section existing = new Section();
        existing.setId(sectionId);
        existing.setCourse(course);

        when(sectionRepository.findSectionByIdAndStatusNot(sectionId, SectionStatus.DELETED))
                .thenReturn(Optional.of(existing));
        when(teacherToCourseRepository.findById(any()))
                .thenReturn(Optional.of(TeacherToCourse.builder().course(course).build()));

        sectionService.deleteSection(sectionId, email);

        assertEquals(SectionStatus.DELETED, existing.getStatus());
        verify(sectionRepository).save(existing);
    }

    @Test
    void deleteSection_shouldThrowWhenNoAccess() {
        Section existing = new Section();
        existing.setId(sectionId);
        existing.setCourse(course);

        when(sectionRepository.findSectionByIdAndStatusNot(sectionId, SectionStatus.DELETED))
                .thenReturn(Optional.of(existing));
        when(teacherToCourseRepository.findById(any())).thenReturn(Optional.empty());

        assertThrows(
                IllegalArgumentException.class,
                () -> sectionService.deleteSection(sectionId, email)
        );
    }

    @Test
    void deleteSectionAdmin_shouldMarkDeleted() {
        Section existing = new Section();
        existing.setId(sectionId);

        when(sectionRepository.findSectionByIdAndStatusNot(sectionId, SectionStatus.DELETED))
                .thenReturn(Optional.of(existing));

        sectionService.deleteSectionAdmin(sectionId);

        assertEquals(SectionStatus.DELETED, existing.getStatus());
        verify(sectionRepository).save(existing);
    }

    @Test
    void getSectionPage_shouldReturnPageContent() {
        Section s1 = new Section();
        Section s2 = new Section();

        when(sectionRepository.findAllByCourseIdAndStatusNot(eq(courseId), eq(SectionStatus.DELETED), any(Pageable.class)))
                .thenReturn(new PageImpl<>(List.of(s1, s2)));

        List<Section> result = sectionService.getSectionPage(courseId, 0, 10);

        assertEquals(2, result.size());
        assertEquals(List.of(s1, s2), result);
    }

    @Test
    void getSection_shouldReturnWhenExists() {
        when(sectionRepository.findSectionByIdAndStatusNot(sectionId, SectionStatus.DELETED))
                .thenReturn(Optional.of(section));

        Section result = sectionService.getSection(sectionId);

        assertEquals(section, result);
    }

    @Test
    void getSection_shouldThrowWhenNotFound() {
        when(sectionRepository.findSectionByIdAndStatusNot(sectionId, SectionStatus.DELETED))
                .thenReturn(Optional.empty());

        IllegalArgumentException ex = assertThrows(
                IllegalArgumentException.class,
                () -> sectionService.getSection(sectionId)
        );

        assertEquals("Секция не существует.", ex.getMessage());
    }
}