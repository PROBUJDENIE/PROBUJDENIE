package org.hse.probujdenie.controller;

import lombok.AllArgsConstructor;
import org.hse.probujdenie.api.AuthApiDelegate;
import org.hse.probujdenie.api.model.SignInAccountRequestDto;
import org.hse.probujdenie.api.model.SignInAccountResponseDto;
import org.hse.probujdenie.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;

@Controller
@AllArgsConstructor
public class AuthController implements AuthApiDelegate {
    private final AuthService authService;

    @Override
    public ResponseEntity<SignInAccountResponseDto> login(SignInAccountRequestDto signInAccountRequestDto) {
        String token = authService.login(signInAccountRequestDto.getEmail(), signInAccountRequestDto.getPassword());

        SignInAccountResponseDto response = new SignInAccountResponseDto();
        System.out.println("начало");
        response.setSuccess(true);
        response.setToken(token);
        return ResponseEntity.ok(response);
    }
}
