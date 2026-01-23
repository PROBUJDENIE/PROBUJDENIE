package org.hse.probujdenie.mapper;

import org.hse.probujdenie.api.model.*;
import org.hse.probujdenie.model.content.Lecture;
import org.mapstruct.*;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface LectureMapper {

    List<LectureGetLecturePageItemResponseDto> toResponseDtoList(List<Lecture> lectures);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateLectureFromDto(Lecture source, @MappingTarget Lecture target);

    Lecture toEntity(LectureCreateRequestDto request);
    Lecture toEntity(LectureUpdateRequestDto request);
    LectureGetLectureItemResponseDto toDto(Lecture request);
}

