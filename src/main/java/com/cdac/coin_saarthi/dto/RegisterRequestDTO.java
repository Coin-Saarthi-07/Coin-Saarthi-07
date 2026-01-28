package com.cdac.coin_saarthi.dto;

import java.time.LocalDate;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class RegisterRequestDTO {
	@NotBlank
    private String userName;
	
	@NotBlank
    private String email;

    @NotBlank
    @Size(min = 8, max = 255)
    @Pattern(
            regexp = "^(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]+$",
            message = "Must contain at least one capital letter, one number, and one special character."
    )
    private String password;
    
    @NotBlank
    private String phoneNo;
    
    @NotNull
    @Past
    private LocalDate dob;
}
