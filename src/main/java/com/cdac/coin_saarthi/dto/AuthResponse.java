package com.cdac.coin_saarthi.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AuthResponse {

    private String token;
    private String role;
    private String message;
    
    public AuthResponse(String role, String message){
    	this.role=role;
    	this.message=message;
    }
}
