package com.cdac.coin_saarthi.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cdac.coin_saarthi.dto.VerifyPaymentDTO;
import com.cdac.coin_saarthi.enums.PaymentMethod;
import com.cdac.coin_saarthi.service.SubscriptionPaymentService;
import com.razorpay.RazorpayException;

import jakarta.annotation.security.PermitAll;

@RestController
@RequestMapping("/api/payments/subscription")
@PermitAll
public class SubscriptionPaymentController {

    private final SubscriptionPaymentService paymentService;

    public SubscriptionPaymentController(SubscriptionPaymentService paymentService) {
        this.paymentService = paymentService;
    }

    // STEP 1: Create order
    @PostMapping("/order")
    public ResponseEntity<?> createOrder(
            @RequestParam Long userId,
            @RequestParam Long planId,
            @RequestParam PaymentMethod paymentMethod) throws RazorpayException {

        return ResponseEntity.ok(
                paymentService.createOrder(userId, planId,paymentMethod)
        );
    }

    // STEP 2: Verify payment
    @PostMapping("/verify")
    public ResponseEntity<?> verifyPayment(
            @RequestBody VerifyPaymentDTO dto) {

        paymentService.verifyAndActivateSubscription(dto);
        return ResponseEntity.ok("Payment verified & subscription activated");
    }
}
