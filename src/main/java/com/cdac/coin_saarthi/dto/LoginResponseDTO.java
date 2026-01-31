package com.cdac.coin_saarthi.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LoginResponseDTO {

    private String token;
    private Long userId;
    private String userName;
    private String role;

}
