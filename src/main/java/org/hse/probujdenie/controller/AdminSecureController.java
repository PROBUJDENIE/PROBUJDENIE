package org.hse.probujdenie.controller;

import lombok.AllArgsConstructor;
import org.hse.probujdenie.api.AdminSecureApiDelegate;
import org.hse.probujdenie.api.model.*;
import org.hse.probujdenie.mapper.CourseMapper;
import org.hse.probujdenie.mapper.LectureMapper;
import org.hse.probujdenie.mapper.SectionMapper;
import org.hse.probujdenie.model.content.Course;
import org.hse.probujdenie.model.content.Lecture;
import org.hse.probujdenie.model.content.Section;
import org.hse.probujdenie.model.fileSaver.FileData;
import org.hse.probujdenie.service.content.CourseService;
import org.hse.probujdenie.service.content.LectureService;
import org.hse.probujdenie.service.content.SectionService;
import org.hse.probujdenie.service.fileSaver.FileSaverService;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;

@Controller
@AllArgsConstructor
public class AdminSecureController implements AdminSecureApiDelegate {

    private final CourseService courseService;
    private final SectionService sectionService;
    private final LectureService lectureService;
    private final FileSaverService fileSaverService;

    private final CourseMapper courseMapper;
    private final SectionMapper sectionMapper;
    private final LectureMapper lectureMapper;

    @Override
    public ResponseEntity<BaseResponseDto> createCourse(CreateCourseRequestDto createCourseRequestDto) {
        Course course = courseMapper.toEntityFromCreateCourseDto(createCourseRequestDto);
        courseService.createCourse(course);

        return ResponseEntity.ok(new BaseResponseDto(true));
    }

    @Override
    public ResponseEntity<BaseResponseDto> updateCourse(UUID id, UpdateCourseRequestDto updateCourseRequestDto) {
        Course course = courseMapper.toEntityFromUpdateCourseDto(updateCourseRequestDto);
        courseService.updateCourse(id, course);

        return ResponseEntity.ok(new BaseResponseDto(true));
    }

    @Override
    public ResponseEntity<GetCoursesOfAdminResponseDto> getCoursesOfAdmin(Integer offset, Integer count) {
        List<Course> courses = courseService.getAllCoursesForAdmin(offset, count);

        GetCoursesOfAdminResponseDto response = new GetCoursesOfAdminResponseDto();
        response.setSuccess(true);
        response.data(courseMapper.toGetAdminCoursesResponseDtoList(courses));

        return ResponseEntity.ok(response);
    }

    @Override
    public ResponseEntity<BaseResponseDto> deleteCourse(UUID id) {
        courseService.deleteCourse(id);
        return ResponseEntity.ok(new BaseResponseDto(true));
    }


    @Override
    public ResponseEntity<BaseResponseDto> createSection(UUID courseId, CreateSectionRequestDto createSectionRequestDto) {
        Section section = sectionMapper.toEntityFromCreateDto(createSectionRequestDto);

        sectionService.createSection(courseId, section);
        return ResponseEntity.ok(new BaseResponseDto(true));
    }

    @Override
    public ResponseEntity<BaseResponseDto> updateSection(UUID sectionId, UpdateSectionRequestDto updateSectionRequestDto) {
        Section section = sectionMapper.toEntityFromUpdateDto(updateSectionRequestDto);
        sectionService.updateSection(sectionId, section);

        return ResponseEntity.ok(new BaseResponseDto(true));
    }

    @Override
    public ResponseEntity<BaseResponseDto> deleteSection(UUID sectionId) {
        sectionService.deleteSection(sectionId);
        return ResponseEntity.ok(new BaseResponseDto(true));
    }


    @Override
    public ResponseEntity<BaseResponseDto> createLecture(UUID sectionId, CreateLectureRequestDto createLectureRequestDto) {
        Lecture lecture = lectureMapper.toEntityFromCreateDto(createLectureRequestDto);
        lectureService.createLecture(sectionId, lecture);

        return ResponseEntity.ok(new BaseResponseDto(true));
    }

    @Override
    public ResponseEntity<BaseResponseDto> updateLecture(UUID lectureId, UpdateLectureRequestDto updateLectureRequestDto) {
        Lecture lecture = lectureMapper.toEntityFromUpdateDto(updateLectureRequestDto);
        lectureService.updateLecture(lectureId, lecture);

        return ResponseEntity.ok(new BaseResponseDto(true));
    }

    @Override
    public ResponseEntity<BaseResponseDto> deleteLecture(UUID lectureId) {
        lectureService.deleteLecture(lectureId);
        return ResponseEntity.ok(new BaseResponseDto(true));
    }

    @Override
    public ResponseEntity<SaveFileResponseDto> saveFile(MultipartFile file) {
        UUID id = fileSaverService.save(file);

        SaveFileResponseDto response = new SaveFileResponseDto();
        response.setId(id);

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
