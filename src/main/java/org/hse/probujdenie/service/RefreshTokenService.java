package org.hse.probujdenie.service;

import lombok.AllArgsConstructor;
import org.hse.probujdenie.model.RefreshToken;
import org.hse.probujdenie.model.user.User;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;


//@Service
//@AllArgsConstructor
//public class RefreshTokenService {
//
//    private final RefreshTokenRepository refreshTokenRepository;
//    private final JwtService jwtService;
//
//    public void save(String token, User user) {
//
//        RefreshToken refreshToken = RefreshToken
//                .builder()
//                .id(UUID.fromString(jwtService.parseClaims(token).getId()))
//                .user(user)
//                .token(token)
//                .isRevoked(false)
//                .build();
//        refreshTokenRepository.save(refreshToken);
//    }
//
//    public RefreshToken getRefreshToken(UUID id) {
//
//        Optional<RefreshToken> opt = refreshTokenRepository.findById(id);
//        if (opt.isEmpty()) {
//            throw new IllegalArgumentException("Токен истек");
//        }
//        return opt.get();
//    }
//}
