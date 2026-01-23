package org.hse.probujdenie.storage.exercise;

import org.hse.probujdenie.model.exercise.VerificationRule;
import org.hse.probujdenie.model.exercise.enums.VerificationRuleStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface VerificationRuleRepository extends JpaRepository<VerificationRule, UUID> {
    List<VerificationRule> findAllByExerciseIdAndStatusNot(UUID verificationRuleId, VerificationRuleStatus status);

    Optional<VerificationRule> findVerificationRuleByIdAndStatusNot(UUID id, VerificationRuleStatus status);
}
