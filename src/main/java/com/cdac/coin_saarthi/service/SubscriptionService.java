package com.cdac.coin_saarthi.service;


import com.cdac.coin_saarthi.enums.SubscriptionStatus;
import com.cdac.coin_saarthi.model.SubscriptionPlan;
import com.cdac.coin_saarthi.model.User;
import com.cdac.coin_saarthi.model.UserSubscription;
import com.cdac.coin_saarthi.repository.SubscriptionPlanRepository;
import com.cdac.coin_saarthi.repository.UserRepository;
import com.cdac.coin_saarthi.repository.UserSubscriptionRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class SubscriptionService {
    private final SubscriptionPlanRepository planRepo;
    private final UserSubscriptionRepository userSubRepo;
    private final UserRepository userRepo;

    public SubscriptionService(SubscriptionPlanRepository planRepo,
                               UserSubscriptionRepository userSubRepo,
                               UserRepository userRepo) {
        this.planRepo = planRepo;
        this.userSubRepo = userSubRepo;
        this.userRepo = userRepo;
    }
    public SubscriptionPlan createPlan(SubscriptionPlan plan) {
        return planRepo.save(plan);
    }

    public UserSubscription subscribeUser(Long userId,Long planId){
        User user=userRepo.findById(userId)
                .orElseThrow(()->new RuntimeException("user not found"));
        SubscriptionPlan plan=planRepo.findById(planId)
                .orElseThrow(()-> new RuntimeException("plan not found"));
        UserSubscription subscription = new UserSubscription();
        subscription.setUser(user);
        subscription.setSubscriptionPlan(plan);
        subscription.setStartDate(LocalDate.now());
        subscription.setEndDate(LocalDate.now().plusDays(plan.getDuration()));
        subscription.setStatus(SubscriptionStatus.ACTIVE);
        return userSubRepo.save(subscription);
    }
    public List<UserSubscription> getUserSubscriptions(Long userId) {
        return userSubRepo.findByUser_UserId(userId);
    }

}
