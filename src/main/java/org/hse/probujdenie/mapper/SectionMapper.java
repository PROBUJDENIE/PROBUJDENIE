package org.hse.probujdenie.mapper;

import org.hse.probujdenie.api.model.SectionCreateRequestDto;
import org.hse.probujdenie.api.model.SectionGetSectionPageItemResponseDto;
import org.hse.probujdenie.api.model.SectionUpdateRequestDto;
import org.hse.probujdenie.model.content.Section;
import org.mapstruct.*;

import java.util.List;

@Mapper(componentModel = "spring")
public interface SectionMapper {

    List<SectionGetSectionPageItemResponseDto> toResponseDtoList(List<Section> sections);

    @Mapping(target = "version", ignore = true)
    @Mapping(target = "creationDateTime", ignore = true)
    @Mapping(target = "lastModificationDateTime", ignore = true)
    @Mapping(target = "status", ignore = true)
    @Mapping(target = "course", ignore = true)
    Section toEntity(SectionUpdateRequestDto request);

    @Mapping(target = "version", ignore = true)
    @Mapping(target = "creationDateTime", ignore = true)
    @Mapping(target = "lastModificationDateTime", ignore = true)
    @Mapping(target = "status", ignore = true)
    @Mapping(target = "course", ignore = true)
    @Mapping(target = "id", ignore = true)
    Section toEntity(SectionCreateRequestDto request);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateCourseFromDto(Section source, @MappingTarget Section target);
}

