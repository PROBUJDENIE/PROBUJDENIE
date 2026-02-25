package org.hse.probujdenie.mapper;

import org.hse.probujdenie.api.model.*;
import org.hse.probujdenie.model.content.Lecture;
import org.hse.probujdenie.model.content.Section;
import org.mapstruct.*;

import java.util.List;

@Mapper(componentModel = "spring")
public interface LectureMapper {

    List<GetLecturePageResponseDtoItem> toGetLecturePageResponseDtoList(List<Lecture> lectures);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "version", ignore = true)
    @Mapping(target = "creationDateTime", ignore = true)
    @Mapping(target = "section", ignore = true)
    @Mapping(target = "lastModificationDateTime", ignore = true)
    @Mapping(target = "status", ignore = true)
    Lecture toEntityFromCreateDto(CreateLectureRequestDto request);

    CreateLectureResponseDtoItem toCreateDtoFromEntity(Lecture request);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "version", ignore = true)
    @Mapping(target = "creationDateTime", ignore = true)
    @Mapping(target = "section", ignore = true)
    @Mapping(target = "lastModificationDateTime", ignore = true)
    @Mapping(target = "status", ignore = true)
    Lecture toEntityFromUpdateDto(UpdateLectureRequestDto request);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateLectureFromDto(Lecture source, @MappingTarget Lecture target);
}
