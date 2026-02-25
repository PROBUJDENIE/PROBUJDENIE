//package org.hse.probujdenie.service;
//
//import io.jsonwebtoken.Claims;
//import lombok.AllArgsConstructor;
//import org.hse.probujdenie.model.RefreshToken;
//import org.hse.probujdenie.model.user.User;
//import org.springframework.stereotype.Service;
//
//import java.util.UUID;
//
//@Service
//@AllArgsConstructor
//public class AuthService {
//    private final JwtService jwtService;
//    private final UserService userService;
//    private final RefreshTokenService refreshTokenService;
//
//    public String[] login(String email, String password) {
//
//        User user = userService.getUserByEmail(email);
//
//        if (user == null || !user.getPassword().equals(password)) {
//            throw new IllegalArgumentException("Неверные данные");
//        }
//
//        String[] response = new String[2];
//        response[0] = jwtService.generateAccessToken(user);
//        response[1] = jwtService.generateRefreshToken(user);
//        refreshTokenService.save(response[1], user);
//
//        return response;
//    }
//
//    public String updateAccessToken(String refreshToken) {
//        Claims claims = jwtService.parseClaims(refreshToken);
//        String refreshTokenId = claims.getId();
//        RefreshToken existingRefreshToken = refreshTokenService.getRefreshToken(UUID.fromString(refreshTokenId));
//        if (jwtService.isExpired(refreshToken)) {
//            throw new IllegalArgumentException("RefreshToken истек");
//        }
//        return jwtService.generateAccessToken(existingRefreshToken.getUser());
//    }
//
//}
