package org.hse.probujdenie.controller;

import lombok.AllArgsConstructor;
import org.hse.probujdenie.api.StudentApiDelegate;
import org.hse.probujdenie.api.model.*;
import org.hse.probujdenie.mapper.StudentSecureMapper;
import org.hse.probujdenie.model.content.Course;
import org.hse.probujdenie.model.content.Lecture;
import org.hse.probujdenie.model.content.Section;
import org.hse.probujdenie.service.content.CourseService;
import org.hse.probujdenie.service.content.LectureService;
import org.hse.probujdenie.service.content.SectionService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;

import java.util.List;
import java.util.UUID;

@Controller
@AllArgsConstructor
public class StudentSecureController implements StudentApiDelegate {

    private final CourseService courseService;
    private final StudentSecureMapper studentSecureMapper;
    private final SectionService sectionService;
    private final LectureService lectureService;

    @Override
    public ResponseEntity<GetUserCoursesResponseDto> getCoursePage(Integer offset, Integer count) {
        List<Course> courses = courseService.getAllReadyCourses(offset, count);

        GetUserCoursesResponseDto response = new GetUserCoursesResponseDto();
        response.setSuccess(true);
        response.data(studentSecureMapper.toCourseResponseList(courses));

        return ResponseEntity.ok(response);
    }

    @Override
    public ResponseEntity<GetUserCoursesResponseDto> getStudentCourses() {
        String email = "student@mail.ru";

        List<Course> courses = courseService.getUserCourses(email);

        GetUserCoursesResponseDto response = new GetUserCoursesResponseDto();
        response.setSuccess(true);
        response.data(studentSecureMapper.toCourseResponseList(courses));

        return ResponseEntity.ok(response);
    }

    @Override
    public ResponseEntity<GetSectionsResponseDto> getSectionPage(UUID courseId, Integer offset, Integer count) {
        List<Section> sections = sectionService.getSectionPage(courseId, offset, count);
        List<GetSectionsResponseDtoItem> dtos = studentSecureMapper.toSectionResponseList(sections);

        GetSectionsResponseDto response = new GetSectionsResponseDto();
        response.setSuccess(true);
        response.setData(dtos);

        return ResponseEntity.ok(response);
    }

    @Override
    public ResponseEntity<GetLecturesResponseDto> getLecturePage(UUID courseId, UUID sectionId, Integer offset, Integer count) {
        List<Lecture> lectures = lectureService.getAllLecturesBySectionId(sectionId, offset, count);
        List<GetLecturesResponseDtoItem> dto = studentSecureMapper.toLectureResponseList(lectures);

        GetLecturesResponseDto response = new GetLecturesResponseDto();
        response.setSuccess(true);
        response.data(dto);
        return ResponseEntity.ok(response);
    }


    @Override
    public ResponseEntity<BaseResponseDto> buyCourse(UUID courseId) {
        String email = "student@mail.ru";

        courseService.buyCourse(email, courseId);
        return ResponseEntity.ok(new BaseResponseDto(true));
    }
}
