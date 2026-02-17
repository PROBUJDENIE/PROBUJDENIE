//package org.hse.probujdenie.service.exercise;
//
//import lombok.RequiredArgsConstructor;
//import org.hse.probujdenie.mapper.ExerciseMapper;
//import org.hse.probujdenie.model.content.Lecture;
//import org.hse.probujdenie.model.exercise.Exercise;
//import org.hse.probujdenie.model.exercise.enums.ExerciseStatus;
//import org.hse.probujdenie.service.content.LectureService;
//import org.hse.probujdenie.storage.exercise.ExerciseRepository;
//import org.springframework.stereotype.Service;
//
//import java.time.LocalDateTime;
//import java.util.List;
//import java.util.Optional;
//import java.util.UUID;
//
//import static org.hse.probujdenie.util.UuidService.generateId;
//
//@Service
//@RequiredArgsConstructor
//public class ExerciseService {
//
//    private final ExerciseRepository exerciseRepository;
//    private final LectureService lectureService;
//    private final ExerciseMapper exerciseMapper;
//
//    public void createExercise(UUID lectureId, Exercise exercise) {
//        Lecture lecture = lectureService.getLecture(lectureId);
//        formExercise(exercise, lecture);
//        exerciseRepository.save(exercise);
//    }
//
//    public void deleteExercise(UUID exerciseId) {
//        Exercise exercise = getExercise(exerciseId);
//        exercise.setStatus(ExerciseStatus.DELETED);
//        exerciseRepository.save(exercise);
//    }
//
//    public List<Exercise> getAllExercisesByLectureId(UUID lectureId) {
//        return exerciseRepository.findAllByLectureIdAndStatusNot(lectureId, ExerciseStatus.DELETED);
//    }
//
//    public void updateExercise(Exercise exercise) {
//        Exercise existing = getExercise(exercise.getId());
//        exerciseMapper.updateExerciseFromDto(exercise, existing);
//        exerciseRepository.save(existing);
//    }
//
//    public Exercise getExercise(UUID id) {
//        Optional<Exercise> exercise = exerciseRepository.findExerciseByIdAndStatusNot(id, ExerciseStatus.DELETED);
//        if (exercise.isEmpty()) throw new IllegalArgumentException("Задание не существует.");
//        return exercise.get();
//    }
//
//
//    private void formExercise(Exercise exercise, Lecture lecture) {
//        exercise.setId(generateId());
//        exercise.setCreationDateTime(LocalDateTime.now());
//        exercise.setLecture(lecture);
//        exercise.setLastModificationDateTime(LocalDateTime.now());
//        exercise.setStatus(ExerciseStatus.CREATED);
//    }
//}
