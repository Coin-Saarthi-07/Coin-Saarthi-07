package com.cdac.coin_saarthi.repository;

import com.cdac.coin_saarthi.model.SubscriptionPlan;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SubscriptionPlanRepository extends JpaRepository<SubscriptionPlan,Long> {
	boolean existsByPlanName(String PlanName);
}
