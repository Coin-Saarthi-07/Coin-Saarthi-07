package com.cdac.coin_saarthi.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Data
public class UpdateDTO {

    @NotBlank
    private String userName;

    @NotBlank
    private String email;

    @Pattern(regexp = "^[6-9]\\d{9}$")
    private String phoneNo;

}
