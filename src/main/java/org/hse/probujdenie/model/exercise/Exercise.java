package org.hse.probujdenie.model.exercise;

import jakarta.persistence.*;
import lombok.*;
import org.hse.probujdenie.model.content.Lecture;
import org.hse.probujdenie.model.exercise.enums.ExerciseStatus;
import org.hse.probujdenie.model.exercise.enums.ProgrammingLanguage;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.UUID;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
//@Entity
//@Table(name = "EXERCISE")
public class Exercise implements Serializable {

    @Id
    @Column(name = "ID", nullable = false)
    private UUID id;

    @Version
    @Column(name = "VERSION", nullable = false)
    private Integer version;

    @Column(name = "TITLE", nullable = false)
    private String title;

    @Column(name = "DESCRIPTION", nullable = false)
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(name = "PROGRAMMING_LANGUAGE", nullable = false)
    private ProgrammingLanguage programmingLanguage;

    @Column(name = "DEFAULT_CODE")
    private String defaultCode;

    @Enumerated(EnumType.STRING)
    @Column(name = "STATUS", nullable = false)
    private ExerciseStatus status;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "LECTURE_ID", referencedColumnName = "ID", nullable = false)
    private Lecture lecture;

    @Column(name = "CREATION_DATE_TIME", nullable = false)
    private LocalDateTime creationDateTime;

    @Column(name = "LAST_MODIFICATION_DATE_TIME", nullable = false)
    private LocalDateTime lastModificationDateTime;
}
