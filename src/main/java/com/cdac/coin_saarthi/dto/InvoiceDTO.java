package com.cdac.coin_saarthi.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import jakarta.xml.bind.annotation.XmlSeeAlso;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class InvoiceDTO {
    private Long invoiceId;
    private BigDecimal amount;
    private LocalDateTime createdAt;
    private String paymentStatus;

    private Long userId;
    private Long paymentId;
    private Long userSubscriptionId;
    
    private Long planId;
    private String planName;
    private Long planDuration;
}
