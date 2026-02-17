package org.hse.probujdenie.model.exercise;

import jakarta.persistence.*;
import lombok.*;
import org.hse.probujdenie.model.exercise.enums.EvaluationDecision;

import java.time.LocalDateTime;
import java.util.UUID;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
//@Entity
//@Table(name = "EVALUATION_RESULT")
public class EvaluationResult {
    @Id
    @Column(name = "ID", nullable = false)
    private UUID id;

    @OneToOne
    @JoinColumn(name = "SUBMISSION_ID", referencedColumnName = "ID", nullable = false, unique = true)
    private StudentSubmission studentSubmission;

    @Enumerated(EnumType.STRING)
    @Column(name = "DECISION", nullable = false)
    private EvaluationDecision decision;

    @Column(name = "BUILD_LOG", nullable = false)
    private String buildLog;

    @Column(name = "CREATION_DATE_TIME", nullable = false)
    private LocalDateTime creationDateTime;

    @Column(name = "LAST_MODIFICATION_DATE_TIME", nullable = false)
    private LocalDateTime lastModificationDateTime;
}
