package com.cdac.coin_saarthi.service;

import com.cdac.coin_saarthi.dto.AuthResponse;
import com.cdac.coin_saarthi.dto.LoginRequestDTO;
import com.cdac.coin_saarthi.dto.RegisterRequestDTO;

public interface AuthService {

    AuthResponse register(RegisterRequestDTO request);

    AuthResponse login(LoginRequestDTO request);
}
