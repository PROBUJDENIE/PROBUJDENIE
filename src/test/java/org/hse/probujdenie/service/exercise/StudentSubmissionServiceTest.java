package org.hse.probujdenie.service.exercise;

import org.hse.probujdenie.model.exercise.Exercise;
import org.hse.probujdenie.model.exercise.StudentSubmission;
import org.hse.probujdenie.model.exercise.enums.StudentSubmissionStatus;
import org.hse.probujdenie.model.user.User;
import org.hse.probujdenie.service.UserService;
import org.hse.probujdenie.storage.exercise.StudentSubmissionRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class StudentSubmissionServiceTest {

    @Mock
    private ExerciseService exerciseService;

    @Mock
    private UserService userService;

    @Mock
    private StudentSubmissionRepository studentSubmissionRepository;

    @InjectMocks
    private StudentSubmissionService studentSubmissionService;

    private String email;
    private UUID exerciseId;
    private UUID submissionId;
    private User user;
    private Exercise exercise;
    private StudentSubmission submission;

    @BeforeEach
    void setUp() {
        email = "student@mail.com";
        exerciseId = UUID.randomUUID();
        submissionId = UUID.randomUUID();

        user = new User();
        user.setEmail(email);

        exercise = new Exercise();
        exercise.setId(exerciseId);

        submission = new StudentSubmission();
        submission.setId(submissionId);
        submission.setAnswer("print('hello')");
        submission.setStatus(StudentSubmissionStatus.SUBMITTED);
    }

    @Test
    void create_shouldFillFieldsAndSave() {
        StudentSubmission newSubmission = new StudentSubmission();
        newSubmission.setAnswer("code");

        when(userService.getUserByEmail(email)).thenReturn(user);
        when(exerciseService.getExercise(exerciseId)).thenReturn(exercise);

        StudentSubmission result = studentSubmissionService.create(email, exerciseId, newSubmission);

        assertNotNull(result.getId());
        assertEquals(user, result.getStudent());
        assertEquals(exercise, result.getExercise());
        assertEquals(StudentSubmissionStatus.SUBMITTED, result.getStatus());
        assertNotNull(result.getCreationDateTime());

        verify(studentSubmissionRepository).save(newSubmission);
    }

    @Test
    void update_shouldSetSubmittedAndClearErrorWhenStatusIsNull() {
        StudentSubmission existing = new StudentSubmission();
        existing.setId(submissionId);
        existing.setStatus(StudentSubmissionStatus.REJECTED);
        existing.setErrorDesc("old error");
        existing.setAnswer("old");

        StudentSubmission update = new StudentSubmission();
        update.setId(submissionId);
        update.setAnswer("new answer");
        update.setStatus(null);

        when(studentSubmissionRepository.findById(submissionId)).thenReturn(Optional.of(existing));

        StudentSubmission result = studentSubmissionService.update(update);

        assertEquals("new answer", existing.getAnswer());
        assertEquals(StudentSubmissionStatus.SUBMITTED, existing.getStatus());
        assertNull(existing.getErrorDesc());
        assertNotNull(existing.getCreationDateTime());

        verify(studentSubmissionRepository).save(existing);
        assertEquals(update, result);
    }

    @Test
    void update_shouldSetProvidedStatusAndErrorDescWhenStatusIsNotNull() {
        StudentSubmission existing = new StudentSubmission();
        existing.setId(submissionId);
        existing.setAnswer("old");
        existing.setStatus(StudentSubmissionStatus.SUBMITTED);

        StudentSubmission update = new StudentSubmission();
        update.setId(submissionId);
        update.setAnswer("new");
        update.setStatus(StudentSubmissionStatus.REJECTED);
        update.setErrorDesc("Compilation failed");

        when(studentSubmissionRepository.findById(submissionId)).thenReturn(Optional.of(existing));

        StudentSubmission result = studentSubmissionService.update(update);

        assertEquals("new", existing.getAnswer());
        assertEquals(StudentSubmissionStatus.REJECTED, existing.getStatus());
        assertEquals("Compilation failed", existing.getErrorDesc());
        assertNotNull(existing.getCreationDateTime());

        verify(studentSubmissionRepository).save(existing);
        assertEquals(update, result);
    }

    @Test
    void getStudentSubmissionByExerciseIdAndEmail_shouldReturnSubmission() {
        when(userService.getUserByEmail(email)).thenReturn(user);
        when(studentSubmissionRepository.findByExerciseIdAndStudentEmail(exerciseId, email))
                .thenReturn(Optional.of(submission));

        StudentSubmission result = studentSubmissionService.getStudentSubmissionByExerciseIdAndEmail(exerciseId, email);

        assertEquals(submission, result);
        verify(userService).getUserByEmail(email);
    }

    @Test
    void getStudentSubmissionByExerciseIdAndEmail_shouldThrowWhenNotFound() {
        when(userService.getUserByEmail(email)).thenReturn(user);
        when(studentSubmissionRepository.findByExerciseIdAndStudentEmail(exerciseId, email))
                .thenReturn(Optional.empty());

        IllegalArgumentException ex = assertThrows(
                IllegalArgumentException.class,
                () -> studentSubmissionService.getStudentSubmissionByExerciseIdAndEmail(exerciseId, email)
        );

        assertEquals("Ответа пользователя не существует.", ex.getMessage());
    }

    @Test
    void getStudentSubmission_shouldReturnSubmission() {
        when(studentSubmissionRepository.findById(submissionId)).thenReturn(Optional.of(submission));

        StudentSubmission result = studentSubmissionService.getStudentSubmission(submissionId);

        assertEquals(submission, result);
    }

    @Test
    void getStudentSubmission_shouldThrowWhenNotFound() {
        when(studentSubmissionRepository.findById(submissionId)).thenReturn(Optional.empty());

        IllegalArgumentException ex = assertThrows(
                IllegalArgumentException.class,
                () -> studentSubmissionService.getStudentSubmission(submissionId)
        );

        assertEquals("Ответа пользователя не существует.", ex.getMessage());
    }

    @Test
    void getAllSendedSubmissions_shouldReturnSubmittedList() {
        StudentSubmission s1 = new StudentSubmission();
        StudentSubmission s2 = new StudentSubmission();

        when(studentSubmissionRepository.findAllByStatus(StudentSubmissionStatus.SUBMITTED))
                .thenReturn(List.of(s1, s2));

        List<StudentSubmission> result = studentSubmissionService.getAllSendedSubmissions();

        assertEquals(2, result.size());
        assertEquals(List.of(s1, s2), result);
    }

    @Test
    void setStatus_shouldChangeStatusAndCallUpdate() {
        StudentSubmission existing = new StudentSubmission();
        existing.setId(submissionId);
        existing.setAnswer("answer");
        existing.setStatus(StudentSubmissionStatus.SUBMITTED);

        when(studentSubmissionRepository.findById(submissionId)).thenReturn(Optional.of(existing));

        studentSubmissionService.setStatus(existing, StudentSubmissionStatus.APPROVED);

        assertEquals(StudentSubmissionStatus.APPROVED, existing.getStatus());
        verify(studentSubmissionRepository).save(existing);
    }
}