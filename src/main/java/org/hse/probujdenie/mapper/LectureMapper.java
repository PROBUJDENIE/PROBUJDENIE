package org.hse.probujdenie.mapper;

import org.hse.probujdenie.api.model.LectureCreateRequestDto;
import org.hse.probujdenie.api.model.LectureGetLecturePageItemResponseDto;
import org.hse.probujdenie.api.model.LectureGetLectureResponseDto;
import org.hse.probujdenie.api.model.LectureUpdateRequestDto;
import org.hse.probujdenie.model.content.Lecture;
import org.mapstruct.*;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface LectureMapper {

    List<LectureGetLecturePageItemResponseDto> toResponseDtoList(List<Lecture> lectures);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateLectureFromDto(Lecture source, @MappingTarget Lecture target);

    @Mapping(target = "version", ignore = true)
    @Mapping(target = "creationDateTime", ignore = true)
    @Mapping(target = "lastModificationDateTime", ignore = true)
    @Mapping(target = "status", ignore = true)
    Lecture toEntity(LectureCreateRequestDto request);

    @Mapping(target = "version", ignore = true)
    @Mapping(target = "creationDateTime", ignore = true)
    @Mapping(target = "lastModificationDateTime", ignore = true)
    @Mapping(target = "status", ignore = true)
    Lecture toEntity(LectureUpdateRequestDto request);

    LectureGetLectureResponseDto toDto(Lecture lecture);

}

