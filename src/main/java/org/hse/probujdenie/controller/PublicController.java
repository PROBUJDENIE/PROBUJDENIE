package org.hse.probujdenie.controller;

import lombok.AllArgsConstructor;
import org.hse.probujdenie.api.PublicApiDelegate;
import org.hse.probujdenie.api.model.*;
import org.hse.probujdenie.mapper.CourseMapper;
import org.hse.probujdenie.mapper.LectureMapper;
import org.hse.probujdenie.mapper.SectionMapper;
import org.hse.probujdenie.mapper.UserMapper;
import org.hse.probujdenie.model.content.Course;
import org.hse.probujdenie.model.content.Lecture;
import org.hse.probujdenie.model.content.Section;
import org.hse.probujdenie.model.fileSaver.FileData;
import org.hse.probujdenie.model.user.User;
import org.hse.probujdenie.model.user.UserData;
import org.hse.probujdenie.service.UserService;
import org.hse.probujdenie.service.content.CourseService;
import org.hse.probujdenie.service.content.LectureService;
import org.hse.probujdenie.service.content.SectionService;
import org.hse.probujdenie.service.fileSaver.FileSaverService;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;

import java.util.List;
import java.util.UUID;

@Controller
@AllArgsConstructor
public class PublicController implements PublicApiDelegate {

    private final CourseService courseService;
    private final SectionService sectionService;
    private final LectureService lectureService;
    private final FileSaverService fileSaverService;
    private final UserService userService;

    private final CourseMapper courseMapper;
    private final SectionMapper sectionMapper;
    private final LectureMapper lectureMapper;
    private final UserMapper userMapper;


    @Override
    public ResponseEntity<LoginResponseDto> login(LoginRequestDto loginRequestDto) {
        User user = userMapper.toEntityFromDto(loginRequestDto);
        String token = userService.login(user);

        LoginResponseDto responseDto = new LoginResponseDto();
        responseDto.setSuccess(true);
        responseDto.token(token);
        return ResponseEntity.ok(responseDto);
    }

    @Override
    public ResponseEntity<RegisterResponseDto> register(RegisterRequestDto registerRequestDto) {
        User user = userMapper.toEntityFromDto(registerRequestDto);
        UserData userData = userMapper.toUserDataFromDto(registerRequestDto);
        userService.create(user, userData);

        RegisterResponseDto responseDto = new RegisterResponseDto();
        responseDto.setSuccess(true);
        responseDto.email(user.getEmail());
        responseDto.password(user.getPassword());
        responseDto.role(RegisterResponseDto.RoleEnum.fromValue(user.getRole().toString()));
        return ResponseEntity.ok(responseDto);
    }

    @Override
    public ResponseEntity<GetCoursePageResponseDto> getCoursePage(Integer offset, Integer count) {
        List<Course> courses = courseService.getAllReadyCourses(offset, count);

        GetCoursePageResponseDto response = new GetCoursePageResponseDto();
        response.setSuccess(true);
        response.data(courseMapper.toGetCoursePageResponseDtoList(courses));

        return ResponseEntity.ok(response);
    }

    @Override
    public ResponseEntity<GetSectionPageResponseDto> getSectionPage(Integer offset, Integer count, UUID courseId) {
        List<Section> sections = sectionService.getSectionPage(courseId, offset, count);

        GetSectionPageResponseDto response = new GetSectionPageResponseDto();
        response.setSuccess(true);
        response.setData(sectionMapper.toGetSectionPageResponseDtoList(sections));

        return ResponseEntity.ok(response);
    }

    @Override
    public ResponseEntity<GetLecturePageResponseDto> getLecturePage(Integer offset, Integer count, UUID sectionId) {
        List<Lecture> lectures = lectureService.getAllLecturesBySectionId(sectionId, offset, count);

        GetLecturePageResponseDto response = new GetLecturePageResponseDto();
        response.setSuccess(true);
        response.data(lectureMapper.toGetLecturePageResponseDtoList(lectures));
        return ResponseEntity.ok(response);
    }

    @Override
    public ResponseEntity<Resource> getFile(String fileId) {
        FileData fileData = fileSaverService.get(fileId);

        return ResponseEntity.ok()
                .headers(fileData.getHttpHeaders())
                .body(fileData.getInputStreamResource());
    }
}
