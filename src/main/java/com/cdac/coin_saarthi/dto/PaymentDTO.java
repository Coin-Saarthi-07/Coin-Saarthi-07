package com.cdac.coin_saarthi.dto;

import com.cdac.coin_saarthi.enums.PaymentMethod;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class PaymentDTO {
    private Long userId;
    private Long subscriptionPlanId;
    private PaymentMethod paymentMethod;
    private BigDecimal amount;
    private String transactionId;
}
