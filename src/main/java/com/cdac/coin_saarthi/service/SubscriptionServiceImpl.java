package com.cdac.coin_saarthi.service;


import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.cdac.coin_saarthi.dto.AuthResponse;
import com.cdac.coin_saarthi.dto.SubscriptionPlanDTO;
import com.cdac.coin_saarthi.enums.SubscriptionStatus;
import com.cdac.coin_saarthi.model.SubscriptionPlan;
import com.cdac.coin_saarthi.model.User;
import com.cdac.coin_saarthi.model.UserSubscription;
import com.cdac.coin_saarthi.repository.SubscriptionPlanRepository;
import com.cdac.coin_saarthi.repository.UserRepository;
import com.cdac.coin_saarthi.repository.UserSubscriptionRepository;

@Service
public class SubscriptionServiceImpl implements SubscriptionService{
    private final SubscriptionPlanRepository planRepo;
    private final UserSubscriptionRepository userSubRepo;
    private final UserRepository userRepo;

    public SubscriptionServiceImpl(SubscriptionPlanRepository planRepo,UserSubscriptionRepository userSubRepo,
    		UserRepository userRepo){           
        this.planRepo = planRepo;
        this.userSubRepo = userSubRepo;
        this.userRepo = userRepo;
    }
    
    //create subscription plan
    public AuthResponse createPlan(SubscriptionPlanDTO dto) {
        if (planRepo.existsByPlanName(dto.getPlanName())) {
            throw new IllegalArgumentException("Plan already exists");
        }

        if (dto.getPlanPrice().compareTo(BigDecimal.ZERO) <= 0) {
            throw new IllegalArgumentException("Price must be positive");
        }
        SubscriptionPlan plan = new SubscriptionPlan();
        plan.setPlanName(dto.getPlanName());
        plan.setFeatures(dto.getFeatures());
        plan.setPlanPrice(dto.getPlanPrice());
        plan.setDuration(dto.getDuration());
        
//        plan.setAlertsEnabled(dto.getAlertsEnabled());
//        plan.setPaperTradingEnabled(dto.getPaperTradingEnabled());
//        plan.setAdvancedChartsEnabled(dto.getAdvancedChartsEnabled());
//
//        plan.setMaxAlerts(dto.getMaxAlerts());
//        plan.setMaxWatchlistItems(dto.getMaxWatchlistItems());
        planRepo.save(plan);
        return new AuthResponse(plan.getPlanName(),"User registered successfully");
    }
    
    //subscribe the user
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
    
    //get user subscription
    public List<UserSubscription> getUserSubscriptions(Long userId) {
        return userSubRepo.findByUser_UserId(userId);
    }

}
