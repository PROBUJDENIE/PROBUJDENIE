package org.hse.probujdenie.controller;

import org.hse.probujdenie.api.AuthApiDelegate;
import org.hse.probujdenie.api.model.SignInAccountRequestDto;
import org.hse.probujdenie.api.model.SignInAccountResponseDto;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;

@Controller
public class AuthController implements AuthApiDelegate {

    @Override
    public ResponseEntity<SignInAccountResponseDto> login(SignInAccountRequestDto signInAccountRequestDto) {
        System.out.println(signInAccountRequestDto.getEmail());
        return AuthApiDelegate.super.login(signInAccountRequestDto);
    }
}
