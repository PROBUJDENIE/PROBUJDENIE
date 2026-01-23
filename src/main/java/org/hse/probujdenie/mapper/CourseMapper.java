package org.hse.probujdenie.mapper;


import org.hse.probujdenie.api.model.CourseCreateRequestDto;
import org.hse.probujdenie.api.model.CourseGetCoursePageItemResponseDto;
import org.hse.probujdenie.api.model.CourseUpdateRequestDto;
import org.hse.probujdenie.model.content.Course;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

import java.util.List;

@Mapper(componentModel = "spring")
public interface CourseMapper {
    List<CourseGetCoursePageItemResponseDto> toResponseDtoList(List<Course> courses);

    Course toEntity(CourseUpdateRequestDto request);
    Course toEntity(CourseCreateRequestDto request);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateCourseFromDto(Course source, @MappingTarget Course target);
}
