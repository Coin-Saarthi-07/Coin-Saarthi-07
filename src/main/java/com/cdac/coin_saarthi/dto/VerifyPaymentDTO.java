package com.cdac.coin_saarthi.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class VerifyPaymentDTO {
    private String razorpayOrderId;
    private String razorpayPaymentId;
    private String razorpaySignature;
}
