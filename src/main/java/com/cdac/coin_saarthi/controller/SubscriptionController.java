package com.cdac.coin_saarthi.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cdac.coin_saarthi.dto.AuthResponse;
import com.cdac.coin_saarthi.dto.SubscriptionPlanDTO;
import com.cdac.coin_saarthi.model.UserSubscription;
import com.cdac.coin_saarthi.service.SubscriptionService;

@RestController
@RequestMapping("/api/subscriptions")
@PreAuthorize("hasRole('ADMIN')")
public class SubscriptionController {
    private final SubscriptionService subscriptionService;

    public SubscriptionController(SubscriptionService subscriptionService) {
        this.subscriptionService = subscriptionService;
    }

    // Create subscription plan
    @PostMapping("/plan")
    public ResponseEntity<AuthResponse> createPlan(
            @RequestBody SubscriptionPlanDTO dto) {
        return ResponseEntity.ok(subscriptionService.createPlan(dto));
    }
    // Subscribe user
    @PostMapping("/subscribe")
    public UserSubscription subscribeUser(
            @RequestParam Long userId,
            @RequestParam Long planId) {
        return subscriptionService.subscribeUser(userId, planId);
    }

    // Get user subscriptions
    @GetMapping("/user/{userId}")
    public List<UserSubscription> getUserSubscriptions(@PathVariable Long userId) {
        return subscriptionService.getUserSubscriptions(userId);
    }
}
