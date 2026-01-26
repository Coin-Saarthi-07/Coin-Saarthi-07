package com.cdac.coin_saarthi.contoller;

import com.cdac.coin_saarthi.model.SubscriptionPlan;
import com.cdac.coin_saarthi.model.UserSubscription;
import com.cdac.coin_saarthi.service.SubscriptionService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/subscriptions")
public class SubscriptionController {
    private final SubscriptionService subscriptionService;

    public SubscriptionController(SubscriptionService subscriptionService) {
        this.subscriptionService = subscriptionService;
    }

    // Create subscription plan
    @PostMapping("/plan")
    public SubscriptionPlan createPlan(@RequestBody SubscriptionPlan plan) {
        return subscriptionService.createPlan(plan);
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
