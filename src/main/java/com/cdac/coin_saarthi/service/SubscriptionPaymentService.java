package com.cdac.coin_saarthi.service;

import com.cdac.coin_saarthi.dto.CreateOrderResponseDTO;
import com.cdac.coin_saarthi.dto.VerifyPaymentDTO;
import com.cdac.coin_saarthi.enums.PaymentMethod;
import com.razorpay.RazorpayException;
public interface SubscriptionPaymentService {

    CreateOrderResponseDTO createOrder(Long userId, Long planId, PaymentMethod paymentMethod)
            throws RazorpayException;

    void verifyAndActivateSubscription(VerifyPaymentDTO dto);
}
