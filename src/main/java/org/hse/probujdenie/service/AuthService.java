package org.hse.probujdenie.service;

import lombok.AllArgsConstructor;
import org.hse.probujdenie.model.user.User;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class AuthService {
    private final JwtService jwtService;
    private final UserService userService;

    public String login(String email, String password) {

        User user = userService.getUserByEmail(email);

        if (user == null || !user.getPassword().equals(password)) {
            throw new IllegalArgumentException("Неверные данные");
        }

        return jwtService.generateAccessToken(user);
    }
}
