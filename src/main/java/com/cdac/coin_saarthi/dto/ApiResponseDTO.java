package com.cdac.coin_saarthi.dto;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class ApiResponseDTO {
    private LocalDateTime timeStamp;
    private String message;
    private String status;
    private Object data;

    public ApiResponseDTO(String message, String status) {
        this.message = message;
        this.status = status;
        this.timeStamp = LocalDateTime.now();
    }

    public ApiResponseDTO(String message, String status, Object data) {
        this.message = message;
        this.status = status;
        this.data = data;       
        this.timeStamp = LocalDateTime.now();
    }
}
