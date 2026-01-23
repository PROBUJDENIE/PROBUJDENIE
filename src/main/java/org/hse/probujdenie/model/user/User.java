package org.hse.probujdenie.model.user;

import jakarta.persistence.*;
import lombok.*;
import org.hse.probujdenie.model.user.enums.UserRole;

import java.time.LocalDateTime;

@Entity
@Table(name = "USR")
@NoArgsConstructor
@Builder
@AllArgsConstructor
@Getter
@Setter
public class User {

    @Version
    @Column(name = "VERSION", nullable = false)
    private Integer version;

    @Id
    @Column(name = "EMAIL", nullable = false, unique = true)
    private String email;

    @Column(name = "PASSWORD", nullable = false)
    private String password;

    @Enumerated(EnumType.STRING)
    private UserRole role;

    @Column(name = "CREATION_DATE_TIME", nullable = false)
    private LocalDateTime creationDateTime;

    @Column(name = "LAST_MODIFICATION_DATE_TIME", nullable = false)
    private LocalDateTime lastModificationDateTime;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
    private UserData userData;
}
