package org.hse.probujdenie.controller;

import lombok.AllArgsConstructor;
import org.hse.probujdenie.api.AuthApiDelegate;
import org.hse.probujdenie.api.model.RefreshAccessTokenResponseDto;
import org.hse.probujdenie.api.model.SignInAccountRequestDto;
import org.hse.probujdenie.api.model.SignInAccountResponseDto;
import org.hse.probujdenie.service.AuthService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;

@Controller
@AllArgsConstructor
public class AuthController implements AuthApiDelegate {
    private final AuthService authService;

    @Override
    public ResponseEntity<SignInAccountResponseDto> login(SignInAccountRequestDto signInAccountRequestDto) {
        String[] tokens = authService.login(signInAccountRequestDto.getEmail(), signInAccountRequestDto.getPassword());

        ResponseCookie refreshCookie = ResponseCookie.from("refreshToken", tokens[1])
                .httpOnly(true)          // JS не видит
                .secure(false)            // только HTTPS (в dev можно false)
                .path("/api/v1/auth")    // только для refresh/logout
                .maxAge(30 * 24 * 60 * 60) // 30 дней
                .build();


        SignInAccountResponseDto response = new SignInAccountResponseDto();
        response.setSuccess(true);
        response.setAccessToken(tokens[0]);
        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, refreshCookie.toString())
                .body(response);
    }

    @Override
    public ResponseEntity<RefreshAccessTokenResponseDto> refreshAccessToken(String refreshToken) {
        String accessToken = authService.updateAccessToken(refreshToken);

        RefreshAccessTokenResponseDto response = new RefreshAccessTokenResponseDto();
        response.setSuccess(true);
        response.setAccessToken(accessToken);
        return ResponseEntity.ok(response);
    }
}
