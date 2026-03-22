package org.hse.probujdenie.model.content;

import jakarta.persistence.*;
import lombok.*;
import org.hse.probujdenie.model.content.enums.SectionStatus;

import java.io.Serial;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.UUID;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
@Entity
@Table(name = "SECTION")
public class Section implements Serializable {

    @Serial
    private static final long serialVersionUID = 7829136421241571165L;

    @Version
    @Column(name = "VERSION", nullable = false)
    private Integer version;

    @Id
    @Column(name = "ID", nullable = false)
    private UUID id;

    @Column(name = "TITLE")
    private String title;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "COURSE_ID", referencedColumnName = "ID")
    private Course course;

    @Column(name = "ORDER_NUMBER", nullable = false)
    private Integer orderNumber;

    @Enumerated(EnumType.STRING)
    @Column(name = "STATUS", nullable = false)
    private SectionStatus status;

    @Column(name = "CREATION_DATE_TIME", nullable = false)
    private LocalDateTime creationDateTime;

    @Column(name = "LAST_MODIFICATION_DATE_TIME", nullable = false)
    private LocalDateTime lastModificationDateTime;
}
