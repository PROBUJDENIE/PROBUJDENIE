package org.hse.probujdenie.model.content;

import jakarta.persistence.*;
import lombok.*;
import org.hse.probujdenie.model.content.enums.LectureStatus;
import java.time.LocalDateTime;
import java.util.UUID;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
@Entity
@Table(name = "LECTURE")
public class Lecture {
    @Version
    @Column(name = "VERSION", nullable = false)
    private Integer version;

    @Id
    @Column(name = "ID", nullable = false)
    private UUID id;

    @Column(name = "TITLE", nullable = false)
    private String title;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "SECTION_ID", referencedColumnName = "ID")
    private Section section;

    @Column(name = "CONTENT_ID")
    private UUID contentId;

    @Column(name = "ORDER_NUMBER", nullable = false)
    private Integer orderNumber;

    @Enumerated(EnumType.STRING)
    @Column(name = "STATUS", nullable = false)
    private LectureStatus status;

    @Column(name = "CREATION_DATE_TIME", nullable = false)
    private LocalDateTime creationDateTime;

    @Column(name = "LAST_MODIFICATION_DATE_TIME", nullable = false)
    private LocalDateTime lastModificationDateTime;
}
