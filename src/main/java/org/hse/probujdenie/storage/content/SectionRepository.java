package org.hse.probujdenie.storage.content;

import org.hse.probujdenie.model.content.Section;
import org.hse.probujdenie.model.content.enums.SectionStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface SectionRepository extends JpaRepository<Section, UUID> {

    Page<Section> findAllByCourseIdAndStatusNot(UUID courseId, SectionStatus status, Pageable pageable);

    Optional<Section> findSectionByIdAndStatusNot(UUID sectionId, SectionStatus status);
}
