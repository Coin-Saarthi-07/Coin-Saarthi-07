package com.cdac.coin_saarthi.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cdac.coin_saarthi.dto.AuthResponse;
import com.cdac.coin_saarthi.dto.LoginRequestDTO;
import com.cdac.coin_saarthi.dto.RegisterRequestDTO;
import com.cdac.coin_saarthi.service.AuthService;

import jakarta.annotation.security.PermitAll;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/auth")
@PermitAll
public class AuthController{
	private final AuthService authService;
	
	public AuthController(AuthService authService) {
		this.authService=authService;
	}
	
	//Register
	@PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@Valid @RequestBody RegisterRequestDTO request) {
        AuthResponse response=authService.register(request);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    //Login
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequestDTO request) {
        AuthResponse response=authService.login(request);
        return ResponseEntity.ok(response);
    }
}
