package org.hse.probujdenie.mapper;

import org.hse.probujdenie.api.model.*;
import org.hse.probujdenie.model.content.Course;
import org.hse.probujdenie.model.content.Section;
import org.mapstruct.*;

import java.util.List;

@Mapper(componentModel = "spring")
public interface SectionMapper {

    List<GetSectionPageResponseDtoItem> toGetSectionPageResponseDtoList(List<Section> sections);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "version", ignore = true)
    @Mapping(target = "creationDateTime", ignore = true)
    @Mapping(target = "lastModificationDateTime", ignore = true)
    @Mapping(target = "status", ignore = true)
    @Mapping(target = "course", ignore = true)
    Section toEntityFromCreateDto(CreateSectionRequestDto request);

    CreateSectionResponseDtoItem toCreateDtoFromEntity(Section request);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "version", ignore = true)
    @Mapping(target = "creationDateTime", ignore = true)
    @Mapping(target = "lastModificationDateTime", ignore = true)
    @Mapping(target = "status", ignore = true)
    @Mapping(target = "course", ignore = true)
    Section toEntityFromUpdateDto(UpdateSectionRequestDto request);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateCourseFromDto(Section source, @MappingTarget Section target);
}
