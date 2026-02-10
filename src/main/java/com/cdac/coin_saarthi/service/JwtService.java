package com.cdac.coin_saarthi.service;

import io.jsonwebtoken.Claims;

public interface JwtService {
	String generateToken(String email, Long userId, String role);

    Claims extractClaims(String token);
    
    boolean isTokenValid(String token);
}
