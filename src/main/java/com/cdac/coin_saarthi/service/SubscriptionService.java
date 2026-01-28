package com.cdac.coin_saarthi.service;

import java.util.List;

import com.cdac.coin_saarthi.dto.AuthResponse;
import com.cdac.coin_saarthi.dto.SubscriptionPlanDTO;
import com.cdac.coin_saarthi.model.UserSubscription;

public interface SubscriptionService {
	AuthResponse createPlan(SubscriptionPlanDTO dto);
	UserSubscription subscribeUser(Long userId,Long planId);
	List<UserSubscription> getUserSubscriptions(Long userId);
}
