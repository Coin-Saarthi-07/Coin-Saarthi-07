package com.cdac.coin_saarthi.service;

import java.math.BigDecimal;
import java.util.UUID;

import org.json.JSONObject;
import org.springframework.stereotype.Service;

import com.cdac.coin_saarthi.model.SubscriptionPlan;
import com.cdac.coin_saarthi.repository.SubscriptionPlanRepository;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;

@Service
public class SubscriptionPaymentServiceImpl implements SubscriptionPaymentService {

    private final RazorpayClient razorpayClient;
    private final SubscriptionPlanRepository planRepository;

    public SubscriptionPaymentServiceImpl(
            RazorpayClient razorpayClient,
            SubscriptionPlanRepository planRepository) {
        this.razorpayClient = razorpayClient;
        this.planRepository = planRepository;
    }

    @Override
    public String createSubscriptionOrder(Long userId, Long planId)
            throws RazorpayException {

        SubscriptionPlan plan = planRepository.findById(planId)
                .orElseThrow(() -> new RuntimeException("Subscription plan not found"));

        // Convert INR → Paise safely
        BigDecimal amountInPaise = plan.getPlanPrice()
                .multiply(BigDecimal.valueOf(100));

        JSONObject orderRequest = new JSONObject();
        orderRequest.put("amount", amountInPaise.intValueExact());
        orderRequest.put("currency", "INR");
        orderRequest.put("receipt", "sub_" + userId + "_" + UUID.randomUUID());
        orderRequest.put("payment_capture", 1);

        Order order = razorpayClient.orders.create(orderRequest);

        return order.toString();
    }
}
