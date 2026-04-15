package org.hse.probujdenie.service.user;

import org.hse.probujdenie.model.user.User;
import org.hse.probujdenie.model.user.enums.UserRole;
import org.hse.probujdenie.storage.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class UserDetailsServiceImplTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserDetailsServiceImpl service;

    @Test
    void loadUserByUsername_shouldReturnUserDetails() {
        String email = "test@mail.com";

        User user = new User();
        user.setEmail(email);
        user.setPassword("password");
        user.setRole(UserRole.STUDENT);

        when(userRepository.findByEmail(email)).thenReturn(Optional.of(user));

        UserDetails result = service.loadUserByUsername(email);

        assertEquals(email, result.getUsername());
        assertEquals("password", result.getPassword());
        assertTrue(result.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals("ROLE_STUDENT")));
    }

    @Test
    void loadUserByUsername_shouldThrowWhenUserNotFound() {
        String email = "notfound@mail.com";

        when(userRepository.findByEmail(email)).thenReturn(Optional.empty());

        UsernameNotFoundException ex = assertThrows(
                UsernameNotFoundException.class,
                () -> service.loadUserByUsername(email)
        );

        assertEquals("User not found", ex.getMessage());
    }
}