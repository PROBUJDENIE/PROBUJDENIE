package org.hse.probujdenie.service.exercise;

import org.hse.probujdenie.ExerciseToCourse;
import org.hse.probujdenie.mapper.ExerciseMapper;
import org.hse.probujdenie.model.content.Course;
import org.hse.probujdenie.model.exercise.Exercise;
import org.hse.probujdenie.model.exercise.enums.ExerciseStatus;
import org.hse.probujdenie.service.content.CourseService;
import org.hse.probujdenie.storage.exercise.ExerciseRepository;
import org.hse.probujdenie.storage.exercise.ExerciseToCourseRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ExerciseServiceTest {

    @Mock
    private ExerciseRepository exerciseRepository;

    @Mock
    private CourseService courseService;

    @Mock
    private ExerciseMapper exerciseMapper;

    @Mock
    private ExerciseToCourseRepository exerciseToCourseRepo;

    @InjectMocks
    private ExerciseService exerciseService;

    private UUID courseId;
    private UUID exerciseId;

    private Course course;
    private Exercise exercise;

    @BeforeEach
    void setUp() {
        courseId = UUID.randomUUID();
        exerciseId = UUID.randomUUID();

        course = new Course();
        course.setId(courseId);

        exercise = new Exercise();
        exercise.setId(exerciseId);
    }

    @Test
    void createExercise_shouldCreateAndLinkToCourse() {
        when(courseService.getCourse(courseId)).thenReturn(course);

        Exercise result = exerciseService.createExercise(courseId, new Exercise());

        assertEquals(ExerciseStatus.READY, result.getStatus());
        assertNotNull(result.getCreationDateTime());
        assertNotNull(result.getLastModificationDateTime());

        verify(exerciseRepository).save(result);

        ArgumentCaptor<ExerciseToCourse> captor = ArgumentCaptor.forClass(ExerciseToCourse.class);
        verify(exerciseToCourseRepo).save(captor.capture());

        ExerciseToCourse link = captor.getValue();
        assertEquals(course, link.getCourse());
        assertEquals(result, link.getExercise());
        assertNotNull(link.getCreationDateTime());
    }

    @Test
    void deleteExercise_shouldMarkDeleted() {
        when(exerciseRepository.findExerciseByIdAndStatus(exerciseId, ExerciseStatus.READY))
                .thenReturn(Optional.of(exercise));

        exerciseService.deleteExercise(exerciseId);

        assertEquals(ExerciseStatus.DELETED, exercise.getStatus());
        assertNotNull(exercise.getLastModificationDateTime());
        verify(exerciseRepository).save(exercise);
    }

    @Test
    void getAllExercisesByCourseId_shouldReturnList() {
        Exercise e1 = new Exercise();
        Exercise e2 = new Exercise();

        when(exerciseRepository.findAllByCourseIdAndStatus(courseId, ExerciseStatus.READY.name()))
                .thenReturn(List.of(e1, e2));

        List<Exercise> result = exerciseService.getAllExercisesByCourseId(courseId);

        assertEquals(2, result.size());
        assertEquals(List.of(e1, e2), result);
    }

    @Test
    void updateExercise_shouldUpdateAndReturn() {
        Exercise existing = new Exercise();
        existing.setId(exerciseId);

        Exercise update = new Exercise();

        when(exerciseRepository.findExerciseByIdAndStatus(exerciseId, ExerciseStatus.READY))
                .thenReturn(Optional.of(existing));

        Exercise result = exerciseService.updateExercise(exerciseId, update);

        verify(exerciseMapper).updateExerciseFromDto(update, existing);
        verify(exerciseRepository).save(existing);

        assertEquals(existing, result);
    }

    @Test
    void getExercise_shouldReturnWhenExists() {
        when(exerciseRepository.findExerciseByIdAndStatus(exerciseId, ExerciseStatus.READY))
                .thenReturn(Optional.of(exercise));

        Exercise result = exerciseService.getExercise(exerciseId);

        assertEquals(exercise, result);
    }

    @Test
    void getExercise_shouldThrowWhenNotFound() {
        when(exerciseRepository.findExerciseByIdAndStatus(exerciseId, ExerciseStatus.READY))
                .thenReturn(Optional.empty());

        IllegalArgumentException ex = assertThrows(
                IllegalArgumentException.class,
                () -> exerciseService.getExercise(exerciseId)
        );

        assertEquals("Задание не существует.", ex.getMessage());
    }
}