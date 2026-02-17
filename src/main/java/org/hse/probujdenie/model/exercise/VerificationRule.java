package org.hse.probujdenie.model.exercise;

import jakarta.persistence.*;
import lombok.*;
import org.hse.probujdenie.model.exercise.enums.ExerciseStatus;
import org.hse.probujdenie.model.exercise.enums.VerificationRuleStatus;

import java.time.LocalDateTime;
import java.util.UUID;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
//@Entity
//@Table(name = "VERIFICATION_RULE")
public class VerificationRule {

    @Id
    @Column(name = "ID", nullable = false)
    private UUID id;

    @Version
    @Column(name = "VERSION", nullable = false)
    private Integer version;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "EXERCISE_ID", nullable = false)
    private Exercise exercise;

    @Column(name = "MEMORY_LIMIT", nullable = false)
    private Integer memoryLimit;

    @Column(name = "TIME_LIMIT", nullable = false)
    private Integer timeLimit;

    @Column(name = "INPUT_DATA", nullable = false)
    private String inputData;

    @Column(name = "OUTPUT_DATA", nullable = false)
    private String outputData;

    @Enumerated(EnumType.STRING)
    @Column(name = "STATUS", nullable = false)
    private VerificationRuleStatus status;

    @Column(name = "CREATION_DATE_TIME", nullable = false)
    private LocalDateTime creationDateTime;

    @Column(name = "LAST_MODIFICATION_DATE_TIME", nullable = false)
    private LocalDateTime lastModificationDateTime;
}
