package org.hse.probujdenie.model.user;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "USER_DATA")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserData {

    @Version
    @Column(name = "VERSION", nullable = false)
    private Integer version;

    @Id
    @Column(name = "EMAIL", nullable = false, unique = true)
    private String email;

    @Column(name = "FIRST_NAME", nullable = false)
    private String firstName;

    @Column(name = "LAST_NAME", nullable = false)
    private String lastName;

    @Column(name = "CREATION_DATE_TIME", nullable = false)
    private LocalDateTime creationDateTime;

    @Column(name = "LAST_MODIFICATION_DATE_TIME", nullable = false)
    private LocalDateTime lastModificationDateTime;
}
