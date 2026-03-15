package org.hse.probujdenie.model.exercise;

import jakarta.persistence.*;
import lombok.*;
import org.hse.probujdenie.model.exercise.enums.ExerciseStatus;
import org.hse.probujdenie.model.exercise.enums.StudentSubmissionStatus;
import org.hse.probujdenie.model.user.User;
import org.hse.probujdenie.model.user.UserData;

import java.time.LocalDateTime;
import java.util.UUID;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
@ToString(exclude = {"exercise", "student"})
@Entity
@Table(name = "STUDENT_SUBMISSION")
public class StudentSubmission {

    @Id
    @Column(name = "ID", nullable = false)
    private UUID id;

    @Version
    @Column(name = "VERSION", nullable = false)
    private Integer version;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "EXERCISE_ID", nullable = false)
    private Exercise exercise;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "STUDENT_EMAIL", referencedColumnName = "EMAIL" ,nullable = false)
    private User student;

    @JoinColumn(name = "ANSWER")
    private String answer;

    @Enumerated(EnumType.STRING)
    @Column(name = "STATUS", nullable = false)
    private StudentSubmissionStatus status;

    @JoinColumn(name = "ERROR_DESC")
    private String errorDesc;

    @Column(name = "CREATION_DATE_TIME", nullable = false)
    private LocalDateTime creationDateTime;

}
