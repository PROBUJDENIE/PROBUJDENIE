package org.hse.probujdenie.model.content;

import jakarta.persistence.*;
import jakarta.validation.constraints.Digits;
import lombok.*;
import org.hse.probujdenie.model.content.enums.CourseStatus;

import java.io.Serial;
import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
@Entity
@Table(name = "COURSE")
public class Course implements Serializable {

    @Serial
    private static final long serialVersionUID = 7829136421241571165L;

    @Version
    @Column(name = "VERSION", nullable = false)
    private Integer version;

    @Id
    @Column(name = "ID", nullable = false)
    private UUID id;

    @Column(name = "TITLE", nullable = false)
    private String title;

    @Column(name = "DESCRIPTION", nullable = false)
    private String description;

    @Column(name = "PRICE")
    @Digits(integer = 10, fraction = 2)
    private BigDecimal price;

    @Column(name = "PHOTO_ID")
    private UUID photoId;

    @Enumerated(EnumType.STRING)
    @Column(name = "STATUS", nullable = false)
    private CourseStatus status;

    @Column(name = "CREATION_DATE_TIME", nullable = false)
    private LocalDateTime creationDateTime;

    @Column(name = "LAST_MODIFICATION_DATE_TIME", nullable = false)
    private LocalDateTime lastModificationDateTime;
}
