package com.cdac.coin_saarthi.service;

import com.cdac.coin_saarthi.dto.PaymentDTO;
import com.cdac.coin_saarthi.enums.PaymentStatus;
import com.cdac.coin_saarthi.enums.UserRole;
import com.cdac.coin_saarthi.model.Payment;
import com.cdac.coin_saarthi.model.SubscriptionPlan;
import com.cdac.coin_saarthi.model.User;
import com.cdac.coin_saarthi.repository.PaymentRepository;
import com.cdac.coin_saarthi.repository.SubscriptionPlanRepository;
import com.cdac.coin_saarthi.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PaymentServiceImpl implements PaymentService {
    private final PaymentRepository paymentRepository;
    private final UserRepository userRepository;
    private final SubscriptionPlanRepository subscriptionPlanRepository;

    public PaymentServiceImpl(PaymentRepository paymentRepository, UserRepository userRepository,
    		SubscriptionPlanRepository subscriptionPlanRepository) {
        this.paymentRepository = paymentRepository;
        this.userRepository = userRepository;
        this.subscriptionPlanRepository = subscriptionPlanRepository;
    }

    // Create payment
    public Payment createPayment(PaymentDTO dto) {

        User user = userRepository.findById(dto.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        SubscriptionPlan plan = subscriptionPlanRepository.findById(dto.getSubscriptionPlanId())
                .orElseThrow(() -> new RuntimeException("Subscription plan not found"));

        Payment payment = new Payment();
        payment.setUser(user);
        payment.setSubscriptionPlan(plan);
        payment.setPaymentMethod(dto.getPaymentMethod());
        payment.setAmount(dto.getAmount());
        payment.setTransactionId(dto.getTransactionId());
        payment.setStatus(PaymentStatus.SUCCESS); // or PENDING
        payment.setCurrencyCode("INR");
        
        user.setRole(UserRole.SUBSCRIBER);
        return paymentRepository.save(payment);
    }

    // Get payments by user
    public List<Payment> getPaymentsByUser(Long userId) {
        return paymentRepository.findByUser_UserId(userId);
    }
}
