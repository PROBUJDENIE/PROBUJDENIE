package org.hse.probujdenie.service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.hse.probujdenie.model.user.User;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.util.Date;

@Service
public class JwtService {
    private final static long MINUTE_IN_SECONDS = 60;

    private final SecretKey key;
    private final long accessTtl = 15 * MINUTE_IN_SECONDS;
    private final long refreshTtl = 30 * 24 * 60 * MINUTE_IN_SECONDS;


    public JwtService(@Value("${jwt.secret}") String secret) {
        this.key = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
    }

    public String generateAccessToken(User user) {
        Instant now = Instant.now();
        Instant exp = now.plusSeconds(accessTtl);

        return Jwts.builder()
                .subject(user.getUserData().getEmail())
                .claim("email", user.getUserData().getEmail())
                .issuedAt(Date.from(now))
                .expiration(Date.from(exp))
                .signWith(key)
                .compact();
    }

    public String generateRefreshToken(User user) {
        Instant now = Instant.now();
        Instant exp = now.plusSeconds(refreshTtl);
        String tokenId = java.util.UUID.randomUUID().toString();

        return Jwts.builder()
                .subject(user.getUserData().getEmail())
                .id(tokenId) // id токена
                .issuedAt(Date.from(now))
                .expiration(Date.from(exp))
                .signWith(key)
                .compact();
    }

    public boolean isExpired(String token) {
        return parseClaims(token)
                .getExpiration()
                .before(new Date());
    }

    public Claims parseClaims(String token) {
        return Jwts.parser()
                .verifyWith(key)
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }
}
