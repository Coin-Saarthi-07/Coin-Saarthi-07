package com.cdac.coin_saarthi.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cdac.coin_saarthi.service.SubscriptionPaymentService;
import com.razorpay.RazorpayException;

@RestController
@RequestMapping("/api/payments")
public class SubscriptionPaymentController {

    private final SubscriptionPaymentService paymentService;

    public SubscriptionPaymentController(
            SubscriptionPaymentService paymentService) {
        this.paymentService = paymentService;
    }

    //create subscription order
    @PostMapping("/subscription/order")
    public ResponseEntity<?> createSubscriptionOrder(
            @RequestParam Long userId,
            @RequestParam Long planId) throws RazorpayException {

        String orderResponse =
                paymentService.createSubscriptionOrder(userId, planId);

        return ResponseEntity.ok(orderResponse);
    }
}
