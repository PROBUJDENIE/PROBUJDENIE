package org.hse.probujdenie.service;

import lombok.AllArgsConstructor;
import org.hse.probujdenie.model.content.Course;
import org.hse.probujdenie.model.content.enums.CourseStatus;
import org.hse.probujdenie.model.user.User;
import org.hse.probujdenie.storage.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    public User getUserByEmail(String email) {
        Optional<User> user = userRepository.findByEmail(email);
        if (user.isEmpty()) throw new IllegalArgumentException("Пользователь не существует.");
        return user.get();
    }

}
