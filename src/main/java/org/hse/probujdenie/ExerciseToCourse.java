package org.hse.probujdenie;

import jakarta.persistence.*;
import lombok.*;
import org.hse.probujdenie.model.content.Course;
import org.hse.probujdenie.model.exercise.Exercise;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "EXERCISE_TO_COURSE")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ExerciseToCourse {

    @EmbeddedId
    @Builder.Default
    private ExerciseCourseId id = new ExerciseCourseId();

    @MapsId("exerciseId")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "EXERCISE_ID", referencedColumnName = "ID")
    private Exercise exercise;

    @MapsId("courseId")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "COURSE_ID", referencedColumnName = "ID")
    private Course course;

    @Column(name = "CREATION_DATE_TIME", nullable = false)
    private LocalDateTime creationDateTime;

    @Embeddable
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ExerciseCourseId implements Serializable {
        @Column(name = "EXERCISE_ID")
        private UUID exerciseId;

        @Column(name = "COURSE_ID")
        private UUID courseId;
    }
}
