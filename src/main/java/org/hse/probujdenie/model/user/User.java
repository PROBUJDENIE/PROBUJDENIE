package org.hse.probujdenie.model.user;

import jakarta.persistence.*;
import lombok.*;
import org.hse.probujdenie.model.user.enums.UserRole;

import java.io.Serial;
import java.io.Serializable;
import java.time.LocalDateTime;

@Entity
@Table(name = "USR")
@NoArgsConstructor
@Builder
@AllArgsConstructor
@Getter
@Setter
public class User implements Serializable {

    @Serial
    private static final long serialVersionUID = 7829136421241571165L;

    @Version
    @Column(name = "VERSION", nullable = false)
    private Integer version;

    @Id
    @Column(name = "EMAIL", nullable = false)
    private String email;

    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    @JoinColumn(name = "EMAIL", nullable = false)
    private UserData userData;

    @Column(name = "PASSWORD", nullable = false)
    private String password;

    @Enumerated(EnumType.STRING)
    private UserRole role;

    @Column(name = "CREATION_DATE_TIME", nullable = false)
    private LocalDateTime creationDateTime;

    @Column(name = "LAST_MODIFICATION_DATE_TIME", nullable = false)
    private LocalDateTime lastModificationDateTime;
}
