package org.hse.probujdenie.controller;

import lombok.AllArgsConstructor;
import org.hse.probujdenie.api.StudentSecureApiDelegate;
import org.hse.probujdenie.api.model.BaseResponseDto;
import org.hse.probujdenie.api.model.GetUserCoursesResponseDto;
import org.hse.probujdenie.mapper.CourseMapper;
import org.hse.probujdenie.model.content.Course;
import org.hse.probujdenie.service.content.CourseService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;

import java.util.List;
import java.util.UUID;

@Controller
@AllArgsConstructor
public class StudentSecureController implements StudentSecureApiDelegate {

    private final CourseService courseService;
    private final CourseMapper courseMapper;

    @Override
    public ResponseEntity<BaseResponseDto> buyCourse(UUID courseId) {
        String email = "student@mail.ru";

        courseService.buyCourse(email, courseId);
        return ResponseEntity.ok(new BaseResponseDto(true));
    }

    @Override
    public ResponseEntity<GetUserCoursesResponseDto> getStudentCourses() {
        String email = "student@mail.ru";

        List<Course> courses = courseService.getUserCourses(email);

        GetUserCoursesResponseDto response = new GetUserCoursesResponseDto();
        response.setSuccess(true);
        response.data(courseMapper.toGetUserCoursesResponseDtoList(courses));

        return ResponseEntity.ok(response);
    }
}
