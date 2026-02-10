package com.cdac.coin_saarthi.dto;

import java.math.BigDecimal;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateOrderResponseDTO {
	private String razorpayOrderId;
	private String currency;
	private BigDecimal amount;
	private String key;
	private String razorpayPaymentId;
    private String razorpaySignature;
}
