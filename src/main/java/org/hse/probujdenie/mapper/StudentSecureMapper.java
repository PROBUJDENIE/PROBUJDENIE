package org.hse.probujdenie.mapper;

import org.hse.probujdenie.api.model.GetLecturesResponseDtoItem;
import org.hse.probujdenie.api.model.GetSectionsResponseDtoItem;
import org.hse.probujdenie.api.model.GetUserCoursesResponseDto;
import org.hse.probujdenie.api.model.GetUserCoursesResponseDtoItem;
import org.hse.probujdenie.model.content.Course;
import org.hse.probujdenie.model.content.Lecture;
import org.hse.probujdenie.model.content.Section;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface StudentSecureMapper {
    List<GetUserCoursesResponseDtoItem> toCourseResponseList(List<Course> courses);
    List<GetSectionsResponseDtoItem> toSectionResponseList(List<Section> sections);
    List<GetLecturesResponseDtoItem> toLectureResponseList(List<Lecture> lectures);
}
