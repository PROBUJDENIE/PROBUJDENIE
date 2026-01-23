package org.hse.probujdenie.service.exercise;

import lombok.RequiredArgsConstructor;
import org.hse.probujdenie.mapper.VerificationRuleMapper;
import org.hse.probujdenie.model.exercise.Exercise;
import org.hse.probujdenie.model.exercise.VerificationRule;
import org.hse.probujdenie.model.exercise.enums.VerificationRuleStatus;
import org.hse.probujdenie.storage.exercise.VerificationRuleRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.hse.probujdenie.util.UuidService.generateId;

@Service
@RequiredArgsConstructor
public class VerificationRuleService {

    private final ExerciseService exerciseService;
    private final VerificationRuleMapper verificationRuleMapper;
    private final VerificationRuleRepository verificationRuleRepository;

    public void createVerificationRule(UUID exerciseId, VerificationRule verificationRule) {
        Exercise exercise = exerciseService.getExercise(exerciseId);
        formVerificationRule(verificationRule, exercise);
        verificationRuleRepository.save(verificationRule);
    }

    public void updateVerificationRule(UUID verificationRuleId, VerificationRule verificationRule) {
        VerificationRule existing = getVerificationRule(verificationRuleId);
        verificationRuleMapper.updateVerificationRuleFromDto(verificationRule, existing);
        verificationRuleRepository.save(existing);
    }

    public void deleteVerificationRule(UUID verificationRuleId) {
        VerificationRule verificationRule = getVerificationRule(verificationRuleId);
        verificationRule.setStatus(VerificationRuleStatus.DELETED);
        verificationRuleRepository.save(verificationRule);
    }

    public List<VerificationRule> getAll(UUID verificationRuleId) {
        return verificationRuleRepository.findAllByExerciseIdAndStatusNot(verificationRuleId, VerificationRuleStatus.DELETED);
    }

    public VerificationRule getVerificationRule(UUID id) {
        Optional<VerificationRule> verificationRule = verificationRuleRepository.findVerificationRuleByIdAndStatusNot(id, VerificationRuleStatus.DELETED);
        if (verificationRule.isEmpty()) throw new IllegalArgumentException("Правило не существует.");
        return verificationRule.get();
    }


    private void formVerificationRule(VerificationRule verificationRule, Exercise exercise) {
        verificationRule.setId(generateId());
        verificationRule.setCreationDateTime(LocalDateTime.now());
        verificationRule.setExercise(exercise);
        verificationRule.setLastModificationDateTime(LocalDateTime.now());
        verificationRule.setStatus(VerificationRuleStatus.CREATED);
    }
}
