package org.hse.probujdenie.service;

import lombok.AllArgsConstructor;
import org.hse.probujdenie.model.user.User;
import org.hse.probujdenie.storage.UserRepository;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email).orElse(null);
    }

}
