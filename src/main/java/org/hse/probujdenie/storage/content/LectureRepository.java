package org.hse.probujdenie.storage.content;

import org.hse.probujdenie.model.content.Lecture;
import org.hse.probujdenie.model.content.enums.LectureStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface LectureRepository extends JpaRepository<Lecture, UUID> {

    Page<Lecture> findAllBySectionIdAndStatusNot(UUID sectionId, LectureStatus status, Pageable pageable);

    Optional<Lecture> findLectureByIdAndStatusNot(UUID lectureId, LectureStatus status);
}
