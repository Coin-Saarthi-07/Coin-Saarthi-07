package com.cdac.coin_saarthi.service;

import com.razorpay.RazorpayException;

public interface SubscriptionPaymentService {
    String createSubscriptionOrder(Long userId, Long planId) throws RazorpayException;
}
