package com.cdac.coin_saarthi.repository;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cdac.coin_saarthi.model.UserSubscription;

public interface UserSubscriptionRepository extends JpaRepository<UserSubscription, Long> {
	List<UserSubscription> findByUser_UserId(Long userId);
}