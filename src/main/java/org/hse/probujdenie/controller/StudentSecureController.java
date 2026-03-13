package org.hse.probujdenie.controller;

import lombok.AllArgsConstructor;
import org.hse.probujdenie.api.StudentSecureApiDelegate;
import org.hse.probujdenie.api.model.*;
import org.hse.probujdenie.mapper.CourseMapper;
import org.hse.probujdenie.mapper.ExerciseMapper;
import org.hse.probujdenie.mapper.StudentSubmissionMapper;
import org.hse.probujdenie.model.content.Course;
import org.hse.probujdenie.model.exercise.Exercise;
import org.hse.probujdenie.model.exercise.StudentSubmission;
import org.hse.probujdenie.service.content.CourseService;
import org.hse.probujdenie.service.exercise.ExerciseService;
import org.hse.probujdenie.service.exercise.StudentSubmissionService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;

import java.util.List;
import java.util.UUID;

@Controller
@AllArgsConstructor
public class StudentSecureController implements StudentSecureApiDelegate {

    private final CourseService courseService;
    private final CourseMapper courseMapper;
    private final StudentSubmissionService studentSubmissionService;
    private final StudentSubmissionMapper studentSubmissionMapper;
    private final ExerciseService exerciseService;
    private final ExerciseMapper exerciseMapper;

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

    @Override
    public ResponseEntity<CreateStudentSubmissionResponseDto> createStudentSubmission(UUID exerciseId, CreateStudentSubmissionRequestDto createStudentSubmissionRequestDto) {
        String email = "student@mail.ru";

        StudentSubmission studentSubmission = studentSubmissionMapper.toEntityFromCreateStudentSubmissionDto(createStudentSubmissionRequestDto);
        StudentSubmission created;
        if (createStudentSubmissionRequestDto.getId() == null) {
            created =  studentSubmissionService.createStudentSubmission(email, exerciseId, studentSubmission);
        }else {
            created =  studentSubmissionService.updateStudentSubmission(email, exerciseId, studentSubmission);
        }
        CreateStudentSubmissionResponseDto response = new CreateStudentSubmissionResponseDto();
        response.success(true);
        response.data(studentSubmissionMapper.toCreateStudentSubmissionDtoFromEntity(created));
        return ResponseEntity.ok(response);
    }

    @Override
    public ResponseEntity<GetStudentSubmissionResponseDto> getStudentSubmission(UUID exerciseId) {
        String email = "student@mail.ru";

        StudentSubmission studentSubmission =  studentSubmissionService.getStudentSubmissionByExerciseIdAndEmail(exerciseId, email);

        GetStudentSubmissionResponseDto response = new GetStudentSubmissionResponseDto();
        response.success(true);
        response.data(studentSubmissionMapper.toGetStudentSubmissionResponseDtoItem(studentSubmission));
        return ResponseEntity.ok(response);
    }

    @Override
    public ResponseEntity<GetExerciseResponseDto> getExercise(UUID exerciseId) {
        Exercise exercise =  exerciseService.getExercise(exerciseId);

        GetExerciseResponseDto response = new GetExerciseResponseDto();
        response.success(true);
        response.data(exerciseMapper.toGetExerciseDto(exercise));
        return ResponseEntity.ok(response);
    }
}
