package org.hse.probujdenie.mapper;


import org.hse.probujdenie.api.model.CourseCreateRequestDto;
import org.hse.probujdenie.api.model.CourseGetCoursePageItemResponseDto;
import org.hse.probujdenie.api.model.CourseGetCourseResponseDto;
import org.hse.probujdenie.api.model.CourseUpdateRequestDto;
import org.hse.probujdenie.model.content.Course;
import org.mapstruct.*;

import java.util.List;

@Mapper(componentModel = "spring")
public interface CourseMapper {
    List<CourseGetCoursePageItemResponseDto> toResponseDtoList(List<Course> courses);

    @Mapping(target = "version", ignore = true)
    @Mapping(target = "creationDateTime", ignore = true)
    @Mapping(target = "lastModificationDateTime", ignore = true)
    @Mapping(target = "status", ignore = true)
    Course toEntity(CourseUpdateRequestDto request);

    @Mapping(target = "version", ignore = true)
    @Mapping(target = "creationDateTime", ignore = true)
    @Mapping(target = "lastModificationDateTime", ignore = true)
    @Mapping(target = "status", ignore = true)
    @Mapping(target = "id", ignore = true)
    Course toEntity(CourseCreateRequestDto request);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateCourseFromDto(Course source, @MappingTarget Course target);

    @Mapping(target = "errors", ignore = true)
    @Mapping(target = "success", ignore = true)
    CourseGetCourseResponseDto toDto(Course course);
}
