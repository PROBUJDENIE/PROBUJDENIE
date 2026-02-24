package org.hse.probujdenie.mapper;

import org.hse.probujdenie.api.model.*;
import org.hse.probujdenie.model.content.Course;
import org.mapstruct.*;

import java.util.List;

@Mapper(componentModel = "spring")
public interface CourseMapper {

    List<GetCoursePageResponseDtoItem> toGetCoursePageResponseDtoList(List<Course> courses);

    List<GetUserCoursesResponseDtoItem> toGetUserCoursesResponseDtoList(List<Course> courses);

    List<GetCoursesOfAdminResponseDtoItem> toGetAdminCoursesResponseDtoList(List<Course> courses);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateCourseFromDto(Course source, @MappingTarget Course target);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "version", ignore = true)
    @Mapping(target = "creationDateTime", ignore = true)
    @Mapping(target = "lastModificationDateTime", ignore = true)
    @Mapping(target = "status", ignore = true)
    Course toEntityFromCreateCourseDto(CreateCourseRequestDto request);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "version", ignore = true)
    @Mapping(target = "creationDateTime", ignore = true)
    @Mapping(target = "lastModificationDateTime", ignore = true)
    @Mapping(target = "status", ignore = true)
    Course toEntityFromUpdateCourseDto(UpdateCourseRequestDto request);
}
