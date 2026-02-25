package org.hse.probujdenie.service.content;

import lombok.RequiredArgsConstructor;
import org.hse.probujdenie.mapper.SectionMapper;
import org.hse.probujdenie.model.content.Course;
import org.hse.probujdenie.model.content.Section;
import org.hse.probujdenie.model.content.enums.SectionStatus;
import org.hse.probujdenie.storage.content.SectionRepository;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;

import static org.hse.probujdenie.util.UuidService.generateId;

@Service
@RequiredArgsConstructor
public class SectionService {

    private final CourseService courseService;
    private final SectionRepository sectionRepository;
    private final SectionMapper sectionMapper;


    public Section createSection(UUID courseId, Section section) {
        Course course = courseService.getCourse(courseId);
        formSection(section, course);
        sectionRepository.save(section);
        return section;
    }

    public void updateSection(UUID sectionId, Section section) {
        Section existing = getSection(sectionId);
        sectionMapper.updateCourseFromDto(section, existing);
        sectionRepository.save(existing);
    }

    public void deleteSection(UUID sectionId) {
        Section section = getSection(sectionId);
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
