package org.hse.probujdenie.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Digits;
import lombok.*;
import org.hse.probujdenie.model.content.Course;
import org.hse.probujdenie.model.user.User;
import org.hse.probujdenie.model.user.UserData;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name ="STUDENT_TO_COURSE")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StudentToCourse {

    @EmbeddedId
    @Builder.Default
    private StudentCourseId id = new StudentCourseId();;

    @MapsId("userEmail")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "USER_EMAIL", referencedColumnName = "EMAIL")
    private User user;

    @MapsId("courseId")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "COURSE_ID", referencedColumnName = "ID")
    private Course course;

    @Column(name = "PRICE")
    @Digits(integer = 10, fraction = 2)
    private BigDecimal price;

    @Column(name = "CREATION_DATE_TIME", nullable = false)
    private LocalDateTime creationDateTime;

    @Embeddable
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class StudentCourseId implements Serializable {
        @Column(name = "USER_EMAIL")
        private String userEmail;

        @Column(name = "COURSE_ID")
        private UUID courseId;
    }
}
