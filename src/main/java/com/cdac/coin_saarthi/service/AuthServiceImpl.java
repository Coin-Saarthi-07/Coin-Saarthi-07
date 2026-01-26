package com.cdac.coin_saarthi.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.cdac.coin_saarthi.dto.AuthResponse;
import com.cdac.coin_saarthi.dto.LoginRequestDTO;
import com.cdac.coin_saarthi.dto.RegisterRequestDTO;
import com.cdac.coin_saarthi.enums.UserRole;
import com.cdac.coin_saarthi.enums.UserStatus;
import com.cdac.coin_saarthi.model.User;
import com.cdac.coin_saarthi.repository.UserRepository;

@Service
public class AuthServiceImpl implements AuthService {
	private final UserRepository userRepository;
	private final JwtService jwtService;
	private final PasswordEncoder passwordEncoder;
	
	public AuthServiceImpl(UserRepository userRepository, JwtService jwtService, PasswordEncoder passwordEncoder) {
		this.userRepository=userRepository;
		this.jwtService=jwtService;
		this.passwordEncoder=passwordEncoder;
	}
	
	//register
	@Override
	public AuthResponse register(RegisterRequestDTO request) {
		if (userRepository.existsByEmail(request.getEmail())){
            throw new RuntimeException("Email already registered");
        }
		if (userRepository.existsByUserName(request.getUserName())){
            throw new RuntimeException("Email already registered");
        }
		
		User user = new User();
		user.setUserName(request.getUserName());
		user.setEmail(request.getEmail());
		user.setPassword(passwordEncoder.encode(request.getPassword()));
		user.setPhoneNo(request.getPhoneNo());
		user.setDob(request.getDob());
		
		//default
		user.setRole(UserRole.USER);
        user.setStatus(UserStatus.ACTIVE);

        userRepository.save(user);
		return new AuthResponse(user.getRole().name(),"User registered successfully");
	}

	//login
	@Override
	public AuthResponse login(LoginRequestDTO request) {
		User user = userRepository.findByUserName(request.getUserName())
                .orElseThrow(()->new RuntimeException("Invalid username or password"));
		
		if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
	        throw new RuntimeException("Invalid username or password");
	    }

		if (user.getStatus()!=UserStatus.ACTIVE){
            throw new RuntimeException("User account is not active");
		}

        String token=jwtService.generateToken(
                user.getEmail(),
        		user.getUserId(),
                user.getRole().name()
        );

		return new AuthResponse(token, user.getRole().name(),"Login successfull");
	}

}
