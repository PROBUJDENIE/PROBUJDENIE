package org.hse.probujdenie.service.content;

import lombok.RequiredArgsConstructor;
import org.hse.probujdenie.mapper.LectureMapper;
import org.hse.probujdenie.model.content.Lecture;
import org.hse.probujdenie.model.content.Section;
import org.hse.probujdenie.model.content.enums.LectureStatus;
import org.hse.probujdenie.storage.content.LectureRepository;
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
public class LectureService {
    private final SectionService sectionService;
    private final LectureRepository lectureRepository;
    private final LectureMapper lectureMapper;

    public Lecture createLecture(UUID sectionId, Lecture lecture) {
        Section section = sectionService.getSection(sectionId);
        formLecture(lecture, section);
        lectureRepository.save(lecture);
        return lecture;
    }

    public void deleteLecture(UUID lectureId) {
        Lecture lecture = getLecture(lectureId);
        lecture.setStatus(LectureStatus.DELETED);
        lectureRepository.save(lecture);
    }

    public List<Lecture> getAllLecturesBySectionId(UUID sectionId, Integer offset, Integer count) {
        Pageable page = PageRequest.of(offset, count);
        return lectureRepository.findAllBySectionIdAndStatusNot(sectionId, LectureStatus.DELETED, page).getContent();
    }

    public void updateLecture(UUID lectureId, Lecture lecture) {
        Lecture existing = getLecture(lectureId);
        lectureMapper.updateLectureFromDto(lecture, existing);
        lectureRepository.save(existing);
    }

    public Lecture getLecture(UUID id) {
        Optional<Lecture> lecture = lectureRepository.findLectureByIdAndStatusNot(id, LectureStatus.DELETED);
        if (lecture.isEmpty()) throw new IllegalArgumentException("Лекция не существует.");
        return lecture.get();
    }

    public void updateLectureContent(UUID lectureId, UUID contentId) {
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

