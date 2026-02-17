//package org.hse.probujdenie.controller.exercise;
//
//import lombok.RequiredArgsConstructor;
//import org.hse.probujdenie.api.ExerciseApiDelegate;
//import org.hse.probujdenie.api.model.*;
//import org.hse.probujdenie.mapper.ExerciseMapper;
//import org.hse.probujdenie.model.exercise.Exercise;
//import org.hse.probujdenie.service.exercise.ExerciseService;
//import org.springframework.http.ResponseEntity;
//import org.springframework.stereotype.Controller;
//
//import java.util.List;
//
//@Controller
//@RequiredArgsConstructor
//public class ExerciseController implements ExerciseApiDelegate {
//
//    private final ExerciseService exerciseService;
//    private final ExerciseMapper exerciseMapper;
//
//    @Override
//    public ResponseEntity<BaseResponseDto> createExercise(CreateExerciseRequest createExerciseRequest) {
//        Exercise exercise = exerciseMapper.toEntity(createExerciseRequest);
//        exerciseService.createExercise(createExerciseRequest.getLectureId(), exercise);
//        return ResponseEntity.ok(new BaseResponseDto(true));
//    }
//
//    @Override
//    public ResponseEntity<BaseResponseDto> updateExercise(UpdateExerciseRequest updateExerciseRequest) {
//        Exercise exercise = exerciseMapper.toEntity(updateExerciseRequest);
//        exerciseService.updateExercise(exercise);
//        return ResponseEntity.ok(new BaseResponseDto(true));
//    }
//
//    @Override
//    public ResponseEntity<BaseResponseDto> deleteExercise(DeleteExerciseRequest deleteExerciseRequest) {
//        exerciseService.deleteExercise(deleteExerciseRequest.getExerciseId());
//        return ResponseEntity.ok(new BaseResponseDto(true));
//    }
//
//    @Override
//    public ResponseEntity<GetAllExercisesResponseDto> getAllExercisesByLectureId(GetAllExerciseRequest getAllExerciseRequest) {
//        List<Exercise> exercises = exerciseService.getAllExercisesByLectureId(getAllExerciseRequest.getLectureId());
//
//        GetAllExercisesResponseDto response = new GetAllExercisesResponseDto();
//        response.setSuccess(true);
//        response.data(exerciseMapper.toResponseDtoList(exercises));
//        return ResponseEntity.ok(response);
//    }
//}
