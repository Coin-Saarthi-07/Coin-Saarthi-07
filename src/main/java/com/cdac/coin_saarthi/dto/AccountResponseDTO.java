package com.cdac.coin_saarthi.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AccountResponseDTO {
	private Long accountId;
    private BigDecimal virtualBalance;
    private LocalDateTime createdAt;
    private LocalDateTime lastUpdated;
}
