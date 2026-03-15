package org.hse.probujdenie.service.content;

import lombok.RequiredArgsConstructor;
import org.hse.probujdenie.mapper.LectureMapper;
import org.hse.probujdenie.model.TeacherToCourse;
import org.hse.probujdenie.model.content.Lecture;
import org.hse.probujdenie.model.content.Section;
import org.hse.probujdenie.model.content.enums.LectureStatus;
import org.hse.probujdenie.storage.TeacherToCourseRepository;
import org.hse.probujdenie.storage.content.LectureRepository;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.hse.probujdenie.util.UuidService.generateId;

@Service
@RequiredArgsConstructor
public class LectureService {
    private final SectionService sectionService;
    private final LectureRepository lectureRepository;
    private final LectureMapper lectureMapper;
    private final TeacherToCourseRepository teacherToCourseRepository;

    @Transactional
    public Lecture createLecture(UUID sectionId, Lecture lecture, String email) {
        Section section = sectionService.getSection(sectionId);
        Optional<TeacherToCourse> teacherToCourse = teacherToCourseRepository.findById(new TeacherToCourse.TeacherCourseId(email, section.getCourse().getId()));
        if (teacherToCourse.isEmpty()) throw new IllegalArgumentException("У вас нет прав.");
        formLecture(lecture, section);
        lectureRepository.save(lecture);
        return lecture;
    }

    @Transactional
    public void deleteLecture(UUID lectureId, String email) {
        Lecture lecture = getLecture(lectureId);
        Optional<TeacherToCourse> teacherToCourse = teacherToCourseRepository.findById(new TeacherToCourse.TeacherCourseId(email, lecture.getSection().getCourse().getId()));
        if (teacherToCourse.isEmpty()) throw new IllegalArgumentException("У вас нет прав.");
        lecture.setStatus(LectureStatus.DELETED);
        lectureRepository.save(lecture);
    }

    public List<Lecture> getAllLecturesBySectionId(UUID sectionId, Integer offset, Integer count) {
        Pageable page = PageRequest.of(offset, count);
        Section section = sectionService.getSection(sectionId);
        return lectureRepository.findAllBySectionIdAndStatusNot(sectionId, LectureStatus.DELETED, page).getContent();
    }

    @Transactional
    public void updateLecture(UUID lectureId, Lecture lecture, String email) {
        Lecture existing = getLecture(lectureId);
        Optional<TeacherToCourse> teacherToCourse = teacherToCourseRepository.findById(new TeacherToCourse.TeacherCourseId(email, existing.getSection().getCourse().getId()));
        if (teacherToCourse.isEmpty()) throw new IllegalArgumentException("У вас нет прав.");
        lectureMapper.updateLectureFromDto(lecture, existing);
        lectureRepository.save(existing);
    }

    public Lecture getLecture(UUID id) {
        Optional<Lecture> lectureOpt = lectureRepository.findLectureByIdAndStatusNot(id, LectureStatus.DELETED);
        if (lectureOpt.isEmpty()) throw new IllegalArgumentException("Лекция не существует.");
        return lectureOpt.get();
    }

    @Transactional
    public void updateLectureContent(UUID lectureId, UUID contentId, String email) {
        Lecture existing = getLecture(lectureId);
        existing.setContentId(contentId);
        lectureRepository.save(existing);
    }


    private void formLecture(Lecture lecture, Section section) {
        lecture.setId(generateId());
        lecture.setCreationDateTime(LocalDateTime.now());
        lecture.setSection(section);
        lecture.setLastModificationDateTime(LocalDateTime.now());
        lecture.setStatus(LectureStatus.CREATED);
    }
}

