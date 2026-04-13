package org.hse.probujdenie.controller;

import lombok.AllArgsConstructor;
import org.hse.probujdenie.api.AdminSecureApiDelegate;
import org.hse.probujdenie.api.TeacherSecureApiDelegate;
import org.hse.probujdenie.api.model.*;
import org.hse.probujdenie.mapper.CourseMapper;
import org.hse.probujdenie.mapper.ExerciseMapper;
import org.hse.probujdenie.mapper.LectureMapper;
import org.hse.probujdenie.mapper.SectionMapper;
import org.hse.probujdenie.model.content.Course;
import org.hse.probujdenie.model.content.Lecture;
import org.hse.probujdenie.model.content.Section;
import org.hse.probujdenie.model.exercise.Exercise;
import org.hse.probujdenie.service.content.CourseService;
import org.hse.probujdenie.service.content.LectureService;
import org.hse.probujdenie.service.content.SectionService;
import org.hse.probujdenie.service.exercise.ExerciseService;
import org.hse.probujdenie.service.fileSaver.FileSaverService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
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
    private final ExerciseService exerciseService;

    private final CourseMapper courseMapper;
    private final SectionMapper sectionMapper;
    private final LectureMapper lectureMapper;
    private final ExerciseMapper exerciseMapper;

    @Override
    public ResponseEntity<CreateCourseResponseDtoAdmin> createCourse(CreateCourseRequestDtoAdmin createCourseRequestDto) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        Course course = courseMapper.toEntityFromCreateCourseDto(createCourseRequestDto);
        Course created = courseService.createCourse(course, email);

        CreateCourseResponseDtoAdmin response = new CreateCourseResponseDtoAdmin();
        response.data(courseMapper.toCreateCourseDtoFromEntity(created));
        response.success(true);

        return ResponseEntity.ok(response);
    }

    @Override
    public ResponseEntity<BaseResponseDto> updateCourse(UUID id, UpdateCourseRequestDtoAdmin updateCourseRequestDto) {
        Course course = courseMapper.toEntityFromUpdateCourseDto(updateCourseRequestDto);
        courseService.updateCourse(id, course);

        return ResponseEntity.ok(new BaseResponseDto(true));
    }

    @Override
    public ResponseEntity<GetCoursesOfAdminResponseDtoAdmin> getAdminCourses(Integer offset, Integer count) {
        List<Course> courses = courseService.getAllCourses(offset, count);

        GetCoursesOfAdminResponseDtoAdmin response = new GetCoursesOfAdminResponseDtoAdmin();
        response.setSuccess(true);
        response.data(courseMapper.toGetAdminCoursesResponseDtoList(courses));

        return ResponseEntity.ok(response);
    }

    @Override
    public ResponseEntity<BaseResponseDto> deleteCourse(UUID id) {
        courseService.deleteCourseAdmin(id);
        return ResponseEntity.ok(new BaseResponseDto(true));
    }


    @Override
    public ResponseEntity<CreateSectionResponseDtoAdmin> createSection(UUID courseId, CreateSectionRequestDtoAdmin createSectionRequestDto) {
        Section section = sectionMapper.toEntityFromCreateDto(createSectionRequestDto);

        Section created = sectionService.createSectionAdmin(courseId, section);
        CreateSectionResponseDtoAdmin response = new CreateSectionResponseDtoAdmin();
        response.success(true);
        response.data(sectionMapper.toCreateDtoFromEntity(created));

        return ResponseEntity.ok(response);
    }

    @Override
    public ResponseEntity<BaseResponseDto> updateSection(UUID sectionId, UpdateSectionRequestDtoAdmin updateSectionRequestDto) {
        Section section = sectionMapper.toEntityFromUpdateDto(updateSectionRequestDto);
        sectionService.updateSectionAdmin(sectionId, section);

        return ResponseEntity.ok(new BaseResponseDto(true));
    }

    @Override
    public ResponseEntity<BaseResponseDto> deleteSection(UUID sectionId) {
        sectionService.deleteSectionAdmin(sectionId);
        return ResponseEntity.ok(new BaseResponseDto(true));
    }


    @Override
    public ResponseEntity<CreateLectureResponseDtoAdmin> createLecture(UUID sectionId, CreateLectureRequestDtoAdmin createLectureRequestDto) {
        Lecture lecture = lectureMapper.toEntityFromCreateDto(createLectureRequestDto);
        Lecture created = lectureService.createLectureAdmin(sectionId, lecture);

        CreateLectureResponseDtoAdmin response = new CreateLectureResponseDtoAdmin();
        response.success(true);
        response.data(lectureMapper.toCreateDtoFromEntity(created));
        return ResponseEntity.ok(response);
    }

    @Override
    public ResponseEntity<BaseResponseDto> updateLecture(UUID lectureId, UpdateLectureRequestDtoAdmin updateLectureRequestDto) {
        Lecture lecture = lectureMapper.toEntityFromUpdateDto(updateLectureRequestDto);
        lectureService.updateLectureAdmin(lectureId, lecture);

        return ResponseEntity.ok(new BaseResponseDto(true));
    }

    @Override
    public ResponseEntity<BaseResponseDto> deleteLecture(UUID lectureId) {
        lectureService.deleteLectureAdmin(lectureId);
        return ResponseEntity.ok(new BaseResponseDto(true));
    }

    @Override
    public ResponseEntity<CreateExerciseResponseDtoAdmin> createExercise(UUID lectureId, CreateExerciseRequestDtoAdmin createExerciseRequestDto) {
        Exercise exercise = exerciseMapper.toEntityFromCreateExerciseDto(createExerciseRequestDto);
        Exercise created =  exerciseService.createExercise(lectureId, exercise);

        CreateExerciseResponseDtoAdmin response = new CreateExerciseResponseDtoAdmin();
        response.success(true);
        response.data(exerciseMapper.toCreateExerciseDtoFromEntity(created));
        return ResponseEntity.ok(response);
    }

    @Override
    public ResponseEntity<UpdateExerciseResponseDtoAdmin> updateExercise(UUID exerciseId, UpdateExerciseRequestDtoAdmin updateExerciseRequestDto) {
        Exercise exercise = exerciseMapper.toEntityFromUpdateExerciseDto(updateExerciseRequestDto);
        Exercise created =  exerciseService.updateExercise(exerciseId, exercise);

        UpdateExerciseResponseDtoAdmin response = exerciseMapper.toUpdateExerciseDtoFromEntityAdmin(created);
        response.success(true);
        return ResponseEntity.ok(response);
    }

    @Override
    public ResponseEntity<BaseResponseDto> deleteExercise(UUID exerciseId) {
        exerciseService.deleteExercise(exerciseId);
        return ResponseEntity.ok(new BaseResponseDto(true));
    }

    @Override
    public ResponseEntity<GetExercisesResponseDtoAdmin> getExercises(UUID courseId) {
        List<Exercise> exercises = exerciseService.getAllExercisesByCourseId(courseId);

        GetExercisesResponseDtoAdmin response = new GetExercisesResponseDtoAdmin();
        response.success(true);
        response.data(exerciseMapper.toGetExercisesResponseDtoList(exercises));
        return ResponseEntity.ok(response);
    }
}
