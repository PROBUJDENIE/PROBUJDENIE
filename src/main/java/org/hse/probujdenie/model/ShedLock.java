package org.hse.probujdenie.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.time.LocalDateTime;

@Entity
@Table(name = "SHEDLOCK")
public class ShedLock {

    @Id
    @Column(name = "NAME", nullable = false)
    private String name;

    @Column(name = "LOCK_UNTIL", nullable = false)
    private LocalDateTime lockUntil;

    @Column(name = "LOCKED_AT", nullable = false)
    private LocalDateTime lockedAt;

    @Column(name = "LOCKED_BY", nullable = false)
    private String lockedBy;
}
