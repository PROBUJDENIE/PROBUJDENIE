package org.hse.probujdenie.mapper;

import org.hse.probujdenie.api.model.SectionCreateRequestDto;
import org.hse.probujdenie.api.model.SectionGetSectionPageItemResponseDto;
import org.hse.probujdenie.api.model.SectionGetSectionPageResponseDto;
import org.hse.probujdenie.api.model.SectionUpdateRequestDto;
import org.hse.probujdenie.model.content.Section;
import org.mapstruct.*;

import java.util.List;

@Mapper(componentModel = "spring")
public interface SectionMapper {

    List<SectionGetSectionPageItemResponseDto> toResponseDtoList(List<Section> sections);

    Section toEntity(SectionUpdateRequestDto request);
    Section toEntity(SectionCreateRequestDto request);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateCourseFromDto(Section source, @MappingTarget Section target);
}

