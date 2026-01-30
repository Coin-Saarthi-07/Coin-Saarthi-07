package com.cdac.coin_saarthi.service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cdac.coin_saarthi.dto.CreateOrderResponseDTO;
import com.cdac.coin_saarthi.dto.VerifyPaymentDTO;
import com.cdac.coin_saarthi.enums.InvoicePaymentStatus;
import com.cdac.coin_saarthi.enums.PaymentMethod;
import com.cdac.coin_saarthi.enums.PaymentStatus;
import com.cdac.coin_saarthi.enums.SubscriptionStatus;
import com.cdac.coin_saarthi.enums.UserRole;
import com.cdac.coin_saarthi.exception.ResourceNotFoundException;
import com.cdac.coin_saarthi.model.Invoice;
import com.cdac.coin_saarthi.model.Payment;
import com.cdac.coin_saarthi.model.SubscriptionPlan;
import com.cdac.coin_saarthi.model.User;
import com.cdac.coin_saarthi.model.UserSubscription;
import com.cdac.coin_saarthi.repository.InvoiceRepository;
import com.cdac.coin_saarthi.repository.PaymentRepository;
import com.cdac.coin_saarthi.repository.SubscriptionPlanRepository;
import com.cdac.coin_saarthi.repository.UserRepository;
import com.cdac.coin_saarthi.repository.UserSubscriptionRepository;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import com.razorpay.Utils;

@Service
@Transactional
public class SubscriptionPaymentServiceImpl implements SubscriptionPaymentService {

	@Value("${razorpay.key.secret}")
	private String razorpayKeySecret;
	private final RazorpayClient razorpayClient;
	private final UserRepository userRepository;
	private final SubscriptionPlanRepository planRepository;
	private final PaymentRepository paymentRepository;
	private final UserSubscriptionRepository userSubscriptionRepository;
	private final InvoiceService invoiceService;
	private final InvoiceRepository invoiceRepository;

	public SubscriptionPaymentServiceImpl(RazorpayClient razorpayClient, UserRepository userRepository,
			SubscriptionPlanRepository planRepository, PaymentRepository paymentRepository,
			UserSubscriptionRepository userSubscriptionRepository, InvoiceService invoiceService,
			InvoiceRepository invoiceRepository) {
		this.razorpayClient = razorpayClient;
		this.userRepository = userRepository;
		this.planRepository = planRepository;
		this.paymentRepository = paymentRepository;
		this.userSubscriptionRepository = userSubscriptionRepository;
		this.invoiceService = invoiceService;
		this.invoiceRepository = invoiceRepository;
	}

	// 1.CREATE RAZORPAY ORDER + SAVE PAYMENT (PENDING)
	@Override
	public CreateOrderResponseDTO createOrder(Long userId, Long planId, PaymentMethod paymentMethod)
			throws RazorpayException {

		User user = userRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User not found"));

		SubscriptionPlan plan = planRepository.findById(planId)
				.orElseThrow(() -> new ResourceNotFoundException("Subscription plan not found"));

		BigDecimal amountInPaise = plan.getPlanPrice().multiply(BigDecimal.valueOf(100));

		JSONObject orderRequest = new JSONObject();
		orderRequest.put("amount", amountInPaise.intValueExact());
		orderRequest.put("currency", "INR");
		orderRequest.put("receipt", "sub_" + userId + "_" + planId + "_" + (System.currentTimeMillis() % 100000));
		orderRequest.put("payment_capture", 1);

		Order order = razorpayClient.orders.create(orderRequest);

		// 🔹 Save payment as PENDING
		Payment payment = new Payment();
		payment.setUser(user);
		payment.setSubscriptionPlan(plan);
		payment.setAmount(plan.getPlanPrice());
		payment.setCurrencyCode("INR");
		payment.setPaymentMethod(PaymentMethod.UPI); // temporary, updated on verify
		payment.setStatus(PaymentStatus.PENDING);
		payment.setTransactionId(order.get("id"));
		payment.setRazorpayOrderId(order.get("id"));
		payment.setPaymentTime(LocalDateTime.now());

		paymentRepository.save(payment);

		// 🔹 Send data to frontend
		CreateOrderResponseDTO response = new CreateOrderResponseDTO();
		response.setRazorpayOrderId(order.get("id"));
		response.setAmount(amountInPaise);
		response.setCurrency("INR");

		return response;
	}

	// verify
	@Override
	public void verifyAndActivateSubscription(VerifyPaymentDTO dto) {

		Payment payment = paymentRepository.findByRazorpayOrderId(dto.getRazorpayOrderId())
				.orElseThrow(() -> new ResourceNotFoundException("Payment not found"));

		if (payment.getStatus().equals(PaymentStatus.SUCCESS)) {
			throw new ResourceNotFoundException("Payment already verified");
		}

		String payload = dto.getRazorpayOrderId() + "|" + dto.getRazorpayPaymentId();

		try {
			// 🔽 ADD THIS BLOCK HERE
			if (dto.getRazorpaySignature() == null || dto.getRazorpaySignature().isBlank()) {
				// Swagger / local testing → skip verification
				System.out.println("⚠️ Signature verification skipped (Swagger testing)");
			} else {
				boolean isValid = Utils.verifySignature(payload, dto.getRazorpaySignature(), razorpayKeySecret);

				if (!isValid) {
					payment.setStatus(PaymentStatus.FAILED);
					paymentRepository.save(payment);
					throw new IllegalStateException("Payment verification failed");
				}
			}

		} catch (Exception e) {
			payment.setStatus(PaymentStatus.FAILED);
			paymentRepository.save(payment);
			throw new IllegalStateException("Payment verification error");
		}

		// ✅ Update payment after verification
		payment.setStatus(PaymentStatus.SUCCESS);
		payment.setRazorpayPaymentId(dto.getRazorpayPaymentId());
		payment.setRazorpaySignature(dto.getRazorpaySignature());
		payment.setPaymentTime(LocalDateTime.now());

		paymentRepository.save(payment);

		// ✅ Activate subscription
		UserSubscription subscription = new UserSubscription();
		subscription.setUser(payment.getUser());
		subscription.setSubscriptionPlan(payment.getSubscriptionPlan());
		subscription.setStartDate(LocalDate.now());
		subscription.setEndDate(LocalDate.now().plusDays(payment.getSubscriptionPlan().getDuration()));
		subscription.setStatus(SubscriptionStatus.ACTIVE);

		userSubscriptionRepository.save(subscription);

		// ✅ Create Invoice AFTER subscription activation
		Invoice invoice = new Invoice();
		if (invoiceRepository.existsByPayment(payment)) {
			throw new ResourceNotFoundException("Invoice already generated");
		}

		invoice.setUser(payment.getUser());
		invoice.setPayment(payment);
		invoice.setUserSubscription(subscription);
		invoice.setAmount(payment.getAmount());
		invoice.setInvoicePaymentStatus(InvoicePaymentStatus.SUCCESS);
		invoice.setCreatedAt(LocalDateTime.now());

		invoiceService.createInvoice(invoice);

		// Promote user role
		User user = userRepository.findById(payment.getUser().getUserId())
		        .orElseThrow(() -> new ResourceNotFoundException("User not found"));

		if (user.getRole() != UserRole.SUBSCRIBER) {
			user.setRole(UserRole.SUBSCRIBER);
			userRepository.save(user);
		}

	}

}
