package com.cdac.coin_saarthi.service;

import java.util.List;

import com.cdac.coin_saarthi.model.UserSubscription;

public interface UserSubscriptionService {
	
	//add user subscription
	UserSubscription addSubscription(UserSubscription subscription);

	//get by id
    UserSubscription getById(Long id);
    
    //get all
    List<UserSubscription> getAllUserSubscription();
    
    //get by user id
    List<UserSubscription> getByUserId(Long userId);
    
    //update status
    UserSubscription updateStatus(Long id, String status);

    //delete Subscription
    void deleteSubscription(Long id);
}
