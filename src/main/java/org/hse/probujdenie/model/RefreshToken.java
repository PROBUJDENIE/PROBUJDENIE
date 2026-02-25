package org.hse.probujdenie.model;

import jakarta.persistence.*;
import lombok.*;
import org.hse.probujdenie.model.user.User;

import java.util.UUID;

//@Entity
@AllArgsConstructor
//@Table(name = "REFRESH_TOKEN")
@NoArgsConstructor
@Builder
@Getter
@Setter
public class RefreshToken {

    @Version
    @Column(name = "VERSION", nullable = false)
    private Integer version;

    @Id
    @Column(name = "ID", nullable = false)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "EMAIL", referencedColumnName = "EMAIL")
    private User user;

    @Column(name = "TOKEN", nullable = false)
    private String token;

    @Column(name = "IS_REVOKED", nullable = false)
    private Boolean isRevoked;

}
