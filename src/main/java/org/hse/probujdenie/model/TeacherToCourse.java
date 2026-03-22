package org.hse.probujdenie.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Digits;
import lombok.*;
import org.hse.probujdenie.model.content.Course;
import org.hse.probujdenie.model.user.User;

import java.io.Serial;
import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name ="TEACHER_TO_COURSE")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TeacherToCourse implements Serializable{

    @Serial
    private static final long serialVersionUID = 7829136421241571165L;

    @EmbeddedId
    @Builder.Default
    private TeacherCourseId id = new TeacherCourseId();;

    @MapsId("teacherEmail")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "TEACHER_EMAIL", referencedColumnName = "EMAIL")
    private User user;

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
    public static class TeacherCourseId implements Serializable {
        @Column(name = "TEACHER_EMAIL")
        private String teacherEmail;

        @Column(name = "COURSE_ID")
        private UUID courseId;
    }
}
