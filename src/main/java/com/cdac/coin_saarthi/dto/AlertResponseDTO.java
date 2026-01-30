package com.cdac.coin_saarthi.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class AlertResponseDTO {

    private Long alertId;
    private Long userId;
    private Long cryptoId;
    private BigDecimal targetPrice;
    private String condition;
    private String status;
    private String type;
    private LocalDateTime createdAt;
}