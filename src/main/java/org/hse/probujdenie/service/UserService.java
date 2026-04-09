package org.hse.probujdenie.service;

import lombok.AllArgsConstructor;
import org.hse.probujdenie.model.content.Course;
import org.hse.probujdenie.model.content.enums.CourseStatus;
import org.hse.probujdenie.model.user.User;
import org.hse.probujdenie.model.user.UserData;
import org.hse.probujdenie.storage.UserRepository;
import org.hse.probujdenie.util.JwtUtil;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
@AllArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final PasswordEncoder passwordEncoder;

    public String login(User user) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword())
            );

            boolean hasRole = authentication.getAuthorities().stream()
                    .anyMatch(a -> a.getAuthority().equals("ROLE_" + user.getRole().name()));

            if (!hasRole) {
                throw new IllegalArgumentException("Не верные данные!");
            }

            UserDetails userDetails = (UserDetails) authentication.getPrincipal();

            return jwtUtil.generateToken(userDetails);
        } catch (BadCredentialsException e) {
            throw new IllegalArgumentException("Не верные данные!");
        }
    }

    @Transactional
    public void create(User user, UserData userDataInfo) {
        if (userRepository.findByEmail(user.getEmail()).isPresent()) throw new IllegalArgumentException("Пользователь с таким логином уже существует.");

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setCreationDateTime(LocalDateTime.now());
        user.setLastModificationDateTime(LocalDateTime.now());

        UserData userData = UserData.builder()
                .firstName(userDataInfo.getFirstName())
                .lastName(userDataInfo.getLastName())
                .email(user.getEmail())
                .lastModificationDateTime(LocalDateTime.now())
                .creationDateTime(LocalDateTime.now())
                .build();
        user.setUserData(userData);
        userRepository.save(user);
    }

    public User getUserByEmail(String email) {
        Optional<User> user = userRepository.findByEmail(email);
        if (user.isEmpty()) throw new IllegalArgumentException("Пользователь не существует.");
        return user.get();
    }

    @Transactional
    public UserData getUserDataByEmail(String email) {
        Optional<User> user = userRepository.findByEmail(email);
        if (user.isEmpty()) throw new IllegalArgumentException("Пользователь не существует.");
        return user.get().getUserData();
    }

}
