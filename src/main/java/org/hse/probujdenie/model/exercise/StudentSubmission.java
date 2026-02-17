package org.hse.probujdenie.model.exercise;

import jakarta.persistence.*;
import lombok.*;
import org.hse.probujdenie.model.user.UserData;

import java.time.LocalDateTime;
import java.util.UUID;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
//@Entity
//@Table(name = "STUDENT_SUBMISSION")
public class StudentSubmission {

    @Id
    @Column(name = "ID", nullable = false)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "EXERCISE_ID", nullable = false)
    private Exercise exercise;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "STUDENT_ID", nullable = false)
    private UserData student;

    @JoinColumn(name = "ANSWER", nullable = false)
    private String answer;

    @Column(name = "CREATION_DATE_TIME", nullable = false)
    private LocalDateTime creationDateTime;

    @Column(name = "LAST_MODIFICATION_DATE_TIME", nullable = false)
    private LocalDateTime lastModificationDateTime;
}
