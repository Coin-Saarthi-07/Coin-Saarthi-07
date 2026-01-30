package com.cdac.coin_saarthi.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class VerifyPaymentDTO {

    private Long userId;
    private Long planId;

    private String razorpayOrderId;
    private String razorpayPaymentId;
    private String razorpaySignature;
}
