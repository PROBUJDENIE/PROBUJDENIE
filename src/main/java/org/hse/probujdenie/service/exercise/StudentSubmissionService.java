package org.hse.probujdenie.service.exercise;

import lombok.RequiredArgsConstructor;
import org.hse.probujdenie.model.exercise.Exercise;
import org.hse.probujdenie.model.exercise.StudentSubmission;
import org.hse.probujdenie.model.user.User;
import org.hse.probujdenie.service.UserService;
import org.hse.probujdenie.storage.exercise.StudentSubmissionRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

import static org.hse.probujdenie.util.UuidService.generateId;


@Service
@RequiredArgsConstructor
public class StudentSubmissionService {

    private final ExerciseService exerciseService;
    private final UserService userService;
    private final StudentSubmissionRepository studentSubmissionRepository;


    public StudentSubmission createStudentSubmission(String userEmail, UUID exerciseId, StudentSubmission studentSubmission) {
        User user = userService.getUserByEmail(userEmail);
        Exercise exercise = exerciseService.getExercise(exerciseId);
        studentSubmission.setId(generateId());
        studentSubmission.setStudent(user);
        studentSubmission.setExercise(exercise);
        studentSubmission.setCreationDateTime(LocalDateTime.now());
        studentSubmissionRepository.save(studentSubmission);
        return studentSubmission;
    }

    public StudentSubmission updateStudentSubmission(String userEmail, UUID exerciseId, StudentSubmission studentSubmission) {
        User user = userService.getUserByEmail(userEmail);
        Exercise exercise = exerciseService.getExercise(exerciseId);
        StudentSubmission existing = getStudentSubmission(studentSubmission.getId());
        existing.setStudent(user);
        existing.setExercise(exercise);
        existing.setAnswer(studentSubmission.getAnswer());
        existing.setCreationDateTime(LocalDateTime.now());
        studentSubmissionRepository.save(existing);
        return existing;
    }

    public StudentSubmission getStudentSubmissionByExerciseIdAndEmail(UUID exerciseId, String email){
        User user = userService.getUserByEmail(email);
        Optional<StudentSubmission> studentSubmission = studentSubmissionRepository.findByExerciseIdAndStudentEmail(exerciseId, email);
        if (studentSubmission.isEmpty()) throw new IllegalArgumentException("Ответа пользователя не существует.");
        return studentSubmission.get();
    }

    public StudentSubmission getStudentSubmission(UUID submissionId){
        Optional<StudentSubmission> studentSubmission = studentSubmissionRepository.findById(submissionId);
        if (studentSubmission.isEmpty()) throw new IllegalArgumentException("Ответа пользователя не существует.");
        return studentSubmission.get();
    }
}

