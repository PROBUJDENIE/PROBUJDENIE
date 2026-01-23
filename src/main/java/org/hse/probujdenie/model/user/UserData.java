package org.hse.probujdenie.model.user;

import jakarta.persistence.*;
import lombok.*;
import org.hse.probujdenie.model.exercise.StudentSubmission;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "USER_DATA")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserData {

    @Id
    @Column(name = "ID", nullable = false)
    private UUID id;

    @OneToOne
    @JoinColumn(name = "EMAIL", referencedColumnName = "EMAIL", nullable = false, unique = true)
    private User user;

    @Column(name = "FIRST_NAME", nullable = false)
    private String firstName;

    @Column(name = "LAST_NAME", nullable = false)
    private String lastName;

    @Column(name = "PHOTO_ID", nullable = false)
    private UUID photoId;

    @Column(name = "CREATION_DATE_TIME", nullable = false)
    private LocalDateTime creationDateTime;

    @Column(name = "LAST_MODIFICATION_DATE_TIME", nullable = false)
    private LocalDateTime lastModificationDateTime;

    @Version
    @Column(name = "VERSION", nullable = false)
    private Integer version;

    @OneToMany(mappedBy = "student")
    private List<StudentSubmission> submissions;

}
