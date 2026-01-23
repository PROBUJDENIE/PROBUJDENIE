package org.hse.probujdenie.mapper;

import org.hse.probujdenie.api.model.CreateVerificationRuleRequest;
import org.hse.probujdenie.api.model.GetAllVerificationRuleItemResponseDto;
import org.hse.probujdenie.api.model.UpdateVerificationRuleRequest;
import org.hse.probujdenie.model.exercise.VerificationRule;
import org.mapstruct.*;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface VerificationRuleMapper {

    List<GetAllVerificationRuleItemResponseDto> toResponseDtoList(List<VerificationRule> verificationRules);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateVerificationRuleFromDto(VerificationRule source, @MappingTarget VerificationRule target);

    VerificationRule toEntity(UpdateVerificationRuleRequest request);
    VerificationRule toEntity(CreateVerificationRuleRequest request);
}

