package org.hse.probujdenie.service.exercise;

import lombok.RequiredArgsConstructor;
import org.hse.probujdenie.mapper.ExerciseMapper;
import org.hse.probujdenie.model.content.Lecture;
import org.hse.probujdenie.model.exercise.Exercise;
import org.hse.probujdenie.model.exercise.enums.ExerciseStatus;
import org.hse.probujdenie.service.content.LectureService;
import org.hse.probujdenie.storage.exercise.ExerciseRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.hse.probujdenie.util.UuidService.generateId;

@Service
@RequiredArgsConstructor
public class ExerciseService {

    private final ExerciseRepository exerciseRepository;
    private final LectureService lectureService;
    private final ExerciseMapper exerciseMapper;

    public Exercise createExercise(UUID lectureId, Exercise exercise) {
        Lecture lecture = lectureService.getLecture(lectureId);
        exercise.setId(generateId());
        exercise.setStatus(ExerciseStatus.READY);
        exercise.setLecture(lecture);
        exercise.setCreationDateTime(LocalDateTime.now());
        exercise.setLastModificationDateTime(LocalDateTime.now());
        exerciseRepository.save(exercise);
        return exercise;
    }

    public void deleteExercise(UUID exerciseId) {
        Exercise exercise = getExercise(exerciseId);
        exercise.setStatus(ExerciseStatus.DELETED);
        exercise.setLastModificationDateTime(LocalDateTime.now());
        exerciseRepository.save(exercise);
    }

    public List<Exercise> getAllExercisesByLectureId(UUID lectureId) {
        return exerciseRepository.findAllByLectureIdAndStatus(lectureId, ExerciseStatus.READY);
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
