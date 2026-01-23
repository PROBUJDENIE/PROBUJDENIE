package org.hse.probujdenie.controller.exercise;

import lombok.RequiredArgsConstructor;
import org.hse.probujdenie.api.VerificationRuleApiDelegate;
import org.hse.probujdenie.api.model.*;
import org.hse.probujdenie.mapper.VerificationRuleMapper;
import org.hse.probujdenie.model.exercise.VerificationRule;
import org.hse.probujdenie.service.exercise.VerificationRuleService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import java.util.List;

@Controller
@RequiredArgsConstructor
public class VerificationRuleController implements VerificationRuleApiDelegate {

    private final VerificationRuleService verificationRuleService;
    private final VerificationRuleMapper verificationRuleMapper;

    @Override
    public ResponseEntity<BaseResponseDto> createVerificationRule(CreateVerificationRuleRequest createVerificationRuleRequest) {
        VerificationRule verificationRule = verificationRuleMapper.toEntity(createVerificationRuleRequest);
        verificationRuleService.createVerificationRule(createVerificationRuleRequest.getExerciseId(), verificationRule);
        return ResponseEntity.ok(new BaseResponseDto(true));
    }

    @Override
    public ResponseEntity<BaseResponseDto> updateVerificationRule(UpdateVerificationRuleRequest updateVerificationRuleRequest) {
        VerificationRule verificationRule = verificationRuleMapper.toEntity(updateVerificationRuleRequest);
        verificationRuleService.updateVerificationRule(updateVerificationRuleRequest.getExerciseId(), verificationRule);
        return ResponseEntity.ok(new BaseResponseDto(true));
    }

    @Override
    public ResponseEntity<BaseResponseDto> deleteVerificationRule(DeleteVerificationRuleRequest deleteVerificationRuleRequest) {
        verificationRuleService.deleteVerificationRule(deleteVerificationRuleRequest.getVerificationRuleId());
        return ResponseEntity.ok(new BaseResponseDto(true));
    }

    @Override
    public ResponseEntity<GetAllVerificationRuleDto> getAllVerificationRules(GetAllVerificationRuleRequest getAllVerificationRuleRequest) {
        List<VerificationRule> verificationRules = verificationRuleService.getAll(getAllVerificationRuleRequest.getExerciseId());

        GetAllVerificationRuleDto response = new GetAllVerificationRuleDto();
        response.setSuccess(true);
        response.data(verificationRuleMapper.toResponseDtoList(verificationRules));
        return ResponseEntity.ok(response);
    }
}
