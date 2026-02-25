package org.hse.probujdenie.controller;

import lombok.AllArgsConstructor;
import org.hse.probujdenie.api.AdminSecureApiDelegate;
import org.hse.probujdenie.api.model.*;
import org.hse.probujdenie.mapper.CourseMapper;
import org.hse.probujdenie.mapper.ExerciseMapper;
import org.hse.probujdenie.mapper.LectureMapper;
import org.hse.probujdenie.mapper.SectionMapper;
import org.hse.probujdenie.model.content.Course;
import org.hse.probujdenie.model.content.Lecture;
import org.hse.probujdenie.model.content.Section;
import org.hse.probujdenie.model.exercise.Exercise;
import org.hse.probujdenie.model.fileSaver.FileData;
import org.hse.probujdenie.service.content.CourseService;
import org.hse.probujdenie.service.content.LectureService;
import org.hse.probujdenie.service.content.SectionService;
import org.hse.probujdenie.service.exercise.ExerciseService;
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
    private final ExerciseService exerciseService;

    private final CourseMapper courseMapper;
    private final SectionMapper sectionMapper;
    private final LectureMapper lectureMapper;
    private final ExerciseMapper exerciseMapper;

    @Override
    public ResponseEntity<CreateCourseResponseDto> createCourse(CreateCourseRequestDto createCourseRequestDto) {
        Course course = courseMapper.toEntityFromCreateCourseDto(createCourseRequestDto);
        Course created = courseService.createCourse(course);

        CreateCourseResponseDto response = new CreateCourseResponseDto();
        response.data(courseMapper.toCreateCourseDtoFromEntity(created));
        response.success(true);

        return ResponseEntity.ok(response);
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
    public ResponseEntity<CreateSectionResponseDto> createSection(UUID courseId, CreateSectionRequestDto createSectionRequestDto) {
        Section section = sectionMapper.toEntityFromCreateDto(createSectionRequestDto);

        Section created = sectionService.createSection(courseId, section);
        CreateSectionResponseDto response = new CreateSectionResponseDto();
        response.success(true);
        response.data(sectionMapper.toCreateDtoFromEntity(created));

        return ResponseEntity.ok(response);
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
    public ResponseEntity<CreateLectureResponseDto> createLecture(UUID sectionId, CreateLectureRequestDto createLectureRequestDto) {
        Lecture lecture = lectureMapper.toEntityFromCreateDto(createLectureRequestDto);
        Lecture created = lectureService.createLecture(sectionId, lecture);

        CreateLectureResponseDto response = new CreateLectureResponseDto();
        response.success(true);
        response.data(lectureMapper.toCreateDtoFromEntity(created));
        return ResponseEntity.ok(response);
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

    @Override
    public ResponseEntity<CreateExerciseResponseDto> createExercise(UUID lectureId, CreateExerciseRequestDto createExerciseRequestDto) {
        Exercise exercise = exerciseMapper.toEntityFromCreateExerciseDto(createExerciseRequestDto);
        Exercise created =  exerciseService.createExercise(lectureId, exercise);

        CreateExerciseResponseDto response = new CreateExerciseResponseDto();
        response.success(true);
        response.data(exerciseMapper.toCreateExerciseDtoFromEntity(created));
        return ResponseEntity.ok(response);
    }

    @Override
    public ResponseEntity<UpdateExerciseResponseDto> updateExercise(UUID exerciseId, UpdateExerciseRequestDto updateExerciseRequestDto) {
        Exercise exercise = exerciseMapper.toEntityFromUpdateExerciseDto(updateExerciseRequestDto);
        Exercise created =  exerciseService.updateExercise(exerciseId, exercise);

        UpdateExerciseResponseDto response = exerciseMapper.toUpdateExerciseDtoFromEntity(created);
        response.success(true);
        return ResponseEntity.ok(response);
    }

    @Override
    public ResponseEntity<BaseResponseDto> deleteExercise(UUID exerciseId) {
        exerciseService.deleteExercise(exerciseId);
        return ResponseEntity.ok(new BaseResponseDto(true));
    }

    @Override
    public ResponseEntity<GetExercisesResponseDto> getExercises(UUID lectureId) {
        List<Exercise> exercises = exerciseService.getAllExercisesByLectureId(lectureId);

        GetExercisesResponseDto response = new GetExercisesResponseDto();
        response.success(true);
        response.data(exerciseMapper.toGetExercisesResponseDtoList(exercises));
        return ResponseEntity.ok(response);
    }


}
