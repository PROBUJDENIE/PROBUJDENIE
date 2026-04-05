package org.hse.probujdenie.service.exercise;

import lombok.RequiredArgsConstructor;
import org.hse.probujdenie.ExerciseToCourse;
import org.hse.probujdenie.mapper.ExerciseMapper;
import org.hse.probujdenie.model.content.Course;
import org.hse.probujdenie.model.exercise.Exercise;
import org.hse.probujdenie.model.exercise.enums.ExerciseStatus;
import org.hse.probujdenie.service.content.CourseService;
import org.hse.probujdenie.storage.exercise.ExerciseRepository;
import org.hse.probujdenie.storage.exercise.ExerciseToCourseRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.hse.probujdenie.util.UuidUtil.generateId;

@Service
@RequiredArgsConstructor
public class ExerciseService {

    private final ExerciseRepository exerciseRepository;
    private final CourseService courseService;
    private final ExerciseMapper exerciseMapper;
    private final ExerciseToCourseRepository exerciseToCourseRepo;

    @Transactional
    public Exercise createExercise(UUID courseId, Exercise exercise) {
        Course course = courseService.getCourse(courseId);
        exercise.setId(generateId());
        exercise.setStatus(ExerciseStatus.READY);
        exercise.setCreationDateTime(LocalDateTime.now());
        exercise.setLastModificationDateTime(LocalDateTime.now());
        exerciseRepository.save(exercise);
        exerciseToCourseRepo.save(ExerciseToCourse.builder().course(course).exercise(exercise).creationDateTime(LocalDateTime.now()).build());
        return exercise;
    }

    public void deleteExercise(UUID exerciseId) {
        Exercise exercise = getExercise(exerciseId);
        exercise.setStatus(ExerciseStatus.DELETED);
        exercise.setLastModificationDateTime(LocalDateTime.now());
        exerciseRepository.save(exercise);
    }

    public List<Exercise> getAllExercisesByCourseId(UUID courseId) {
        return exerciseRepository.findAllByCourseIdAndStatus(courseId, ExerciseStatus.READY.name());
    }

    public Exercise updateExercise(UUID exerciseId, Exercise exercise) {
        Exercise existing = getExercise(exerciseId);
        exerciseMapper.updateExerciseFromDto(exercise, existing);
        exerciseRepository.save(existing);
        return existing;
    }

    public Exercise getExercise(UUID id) {
        Optional<Exercise> exercise = exerciseRepository.findExerciseByIdAndStatus(id, ExerciseStatus.READY);
        if (exercise.isEmpty()) throw new IllegalArgumentException("Задание не существует.");
        return exercise.get();
    }

}
