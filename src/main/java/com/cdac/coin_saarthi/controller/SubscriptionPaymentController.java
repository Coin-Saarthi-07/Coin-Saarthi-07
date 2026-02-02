package com.cdac.coin_saarthi.controller;

import java.util.Map;

import org.apache.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cdac.coin_saarthi.dto.VerifyPaymentDTO;
import com.cdac.coin_saarthi.enums.PaymentMethod;
import com.cdac.coin_saarthi.service.SubscriptionPaymentService;
import com.razorpay.RazorpayException;

@RestController
@RequestMapping("/api/payments/subscription")
@PreAuthorize("hasAnyAuthority('ADMIN','SUBSCRIBER','USER')")
public class SubscriptionPaymentController {

	private final SubscriptionPaymentService paymentService;

	public SubscriptionPaymentController(SubscriptionPaymentService paymentService) {
		this.paymentService = paymentService;
	}

	// STEP 1: Create order
	@PostMapping("/order")
	public ResponseEntity<?> createOrder(@RequestParam Long userId, @RequestParam Long planId) throws RazorpayException {

		return ResponseEntity.ok(paymentService.createOrder(userId, planId));
	}

	// STEP 2: Verify payment
	@PostMapping("/verify")
	public ResponseEntity<?> verifyPayment(@RequestBody VerifyPaymentDTO dto) {
		try {
			paymentService.verifyAndActivateSubscription(dto);
			return ResponseEntity.ok("Payment verified & subscription activated");

		} catch (IllegalStateException e) {
			return ResponseEntity.badRequest().body(e.getMessage());

		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.SC_INTERNAL_SERVER_ERROR).body("Payment verification failed");
		}
	}

//    @PostMapping("/verify")
//    public ResponseEntity<?> verifyPayment(
//            @RequestBody VerifyPaymentDTO dto) {
//
//        paymentService.verifyAndActivateSubscription(dto);
//        return ResponseEntity.ok("Payment verified & subscription activated");
//    }
}
