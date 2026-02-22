package org.hse.probujdenie.controller.content;

import lombok.RequiredArgsConstructor;
import org.hse.probujdenie.api.CourseApiDelegate;
import org.hse.probujdenie.api.model.*;
import org.hse.probujdenie.mapper.CourseMapper;
import org.hse.probujdenie.model.content.Course;
import org.hse.probujdenie.service.content.CourseService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import java.util.List;
import java.util.UUID;

@Controller
@RequiredArgsConstructor
public class CourseController implements CourseApiDelegate {

    private final CourseService courseService;
    private final CourseMapper courseMapper;


    @Override
    public ResponseEntity<BaseResponseDto> createCourse(CourseCreateRequestDto courseCreateRequestDto) {
        Course course = courseMapper.toEntity(courseCreateRequestDto);
        courseService.createCourse(course);
        return ResponseEntity.ok(new BaseResponseDto(true));
    }

    @Override
    public ResponseEntity<BaseResponseDto> updateCourse(CourseUpdateRequestDto courseUpdateRequestDto) {
        Course course = courseMapper.toEntity(courseUpdateRequestDto);
        courseService.updateCourse(course);
        return ResponseEntity.ok(new BaseResponseDto(true));
    }


    @Override
    public ResponseEntity<BaseResponseDto> deleteCourse(UUID id) {
        courseService.deleteCourse(id);
        return ResponseEntity.ok(new BaseResponseDto(true));
    }

    @Override
    public ResponseEntity<CourseGetCoursePageResponseDto> getCoursePage(Integer offset, Integer count) {
        List<Course> courses = courseService.getAllReadyCourses(offset, count);

        CourseGetCoursePageResponseDto response = new CourseGetCoursePageResponseDto();
        response.setSuccess(true);
        response.data(courseMapper.toResponseDtoList(courses));

        return ResponseEntity.ok(response);

    }

    @Override
    public ResponseEntity<CourseGetCourseResponseDto> getCourse(UUID id) {
        Course course = courseService.getCourse(id);

        CourseGetCourseResponseDto response = courseMapper.toDto(course);
        response.setSuccess(true);
        return ResponseEntity.ok(response);
    }
}
