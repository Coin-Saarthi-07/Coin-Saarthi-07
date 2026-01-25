package com.cdac.coin_saarthi.repository;

import com.cdac.coin_saarthi.model.UserSubscription;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserSubscriptionRepository extends JpaRepository<UserSubscription,Long> {

    List<UserSubscription> findByUser_UserId(Long userId);
}
