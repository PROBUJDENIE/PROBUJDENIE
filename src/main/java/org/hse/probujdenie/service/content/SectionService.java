package org.hse.probujdenie.service.content;

import lombok.RequiredArgsConstructor;
import org.hse.probujdenie.mapper.SectionMapper;
import org.hse.probujdenie.model.TeacherToCourse;
import org.hse.probujdenie.model.content.Course;
import org.hse.probujdenie.model.content.Section;
import org.hse.probujdenie.model.content.enums.SectionStatus;
import org.hse.probujdenie.storage.TeacherToCourseRepository;
import org.hse.probujdenie.storage.content.SectionRepository;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.*;

import static org.hse.probujdenie.util.UuidUtil.generateId;

@Service
@RequiredArgsConstructor
public class SectionService {

    private final CourseService courseService;
    private final SectionRepository sectionRepository;
    private final SectionMapper sectionMapper;
    private final TeacherToCourseRepository teacherToCourseRepository;

    public Section createSection(UUID courseId, Section section, String email) {
        Course course = courseService.getCourse(courseId);
        Optional<TeacherToCourse> teacherToCourse = teacherToCourseRepository.findById(new TeacherToCourse.TeacherCourseId(email, courseId));
        if (teacherToCourse.isEmpty()) throw new IllegalArgumentException("У вас нет прав.");
        formSection(section, course);
        sectionRepository.save(section);
        return section;
    }

    @Transactional
    public void updateSection(UUID sectionId, Section section, String email) {
        Section existing = getSection(sectionId);
        Optional<TeacherToCourse> teacherToCourse = teacherToCourseRepository.findById(new TeacherToCourse.TeacherCourseId(email, existing.getCourse().getId()));
        if (teacherToCourse.isEmpty()) throw new IllegalArgumentException("У вас нет прав.");
        sectionMapper.updateCourseFromDto(section, existing);
        sectionRepository.save(existing);
    }

    @Transactional
    public void deleteSection(UUID sectionId, String email) {
        Section section = getSection(sectionId);
        Optional<TeacherToCourse> teacherToCourse = teacherToCourseRepository.findById(new TeacherToCourse.TeacherCourseId(email, section.getCourse().getId()));
        if (teacherToCourse.isEmpty()) throw new IllegalArgumentException("У вас нет прав.");
        section.setStatus(SectionStatus.DELETED);
        sectionRepository.save(section);
    }

    public List<Section> getSectionPage(UUID courseId, Integer offset, Integer count) {
        Pageable page = PageRequest.of(offset, count);
        return sectionRepository.findAllByCourseIdAndStatusNot(courseId, SectionStatus.DELETED, page).getContent();
    }

    public Section getSection(UUID id) {
        Optional<Section> section = sectionRepository.findSectionByIdAndStatusNot(id, SectionStatus.DELETED);
        if (section.isEmpty()) throw new IllegalArgumentException("Секция не существует.");
        return section.get();
    }

    private void formSection(Section section, Course course) {
        section.setId(generateId());
        section.setCreationDateTime(LocalDateTime.now());
        section.setCourse(course);
        section.setLastModificationDateTime(LocalDateTime.now());
        section.setStatus(SectionStatus.CREATED);
    }
}
