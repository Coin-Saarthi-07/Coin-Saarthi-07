package com.cdac.coin_saarthi.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.cdac.coin_saarthi.enums.SubscriptionStatus;
import com.cdac.coin_saarthi.model.UserSubscription;
import com.cdac.coin_saarthi.repository.UserRepository;
import com.cdac.coin_saarthi.repository.UserSubscriptionRepository;

@Service
public class UserSubscriptionServiceImpl implements UserSubscriptionService {

    private final UserRepository userRepository;
	
	private final UserSubscriptionRepository userSubscriptionRepository;
	
	public UserSubscriptionServiceImpl(UserSubscriptionRepository userSubscriptionRepository, UserRepository userRepository) {
		this.userSubscriptionRepository = userSubscriptionRepository;
		this.userRepository = userRepository;
	}
	
	//add 
	@Override
	public UserSubscription addSubscription(UserSubscription subscription) {
		if(subscription.getStatus()==null) {
			subscription.setStatus(SubscriptionStatus.ACTIVE);
		}
		return userSubscriptionRepository.save(subscription);
	}
	
	//get by Id
	@Override
	public UserSubscription getById(Long id) {
		return userSubscriptionRepository.findById(id)
				.orElseThrow(()-> new RuntimeException("Subscription of given id not found"));
	}
	
	//get all
	@Override
	public List<UserSubscription> getAllUserSubscription() {
		return userSubscriptionRepository.findAll();
	}

	//get by user id
	@Override
	public List<UserSubscription> getByUserId(Long userId) {
		List<UserSubscription> subscriptions = userSubscriptionRepository.findByUser_UserId(userId);
		
		if(subscriptions.isEmpty()) {
			throw new RuntimeException("Subscription of given user not found");
		}
		return subscriptions;
	}

	//update the status
	@Override
	public UserSubscription updateStatus(Long id, String status) {
		UserSubscription userSubscription = getById(id);
		try {
			SubscriptionStatus subscriptionStatus  = SubscriptionStatus.valueOf(status.toUpperCase());
		}
		catch(IllegalArgumentException e) {
			throw new RuntimeException("Invalid subscription status: " + status);
		}
		return userSubscriptionRepository.save(userSubscription);
	}

	//delete
	@Override
	public void deleteSubscription(Long id) {
		UserSubscription userSubscription = getById(id);
		if(userSubscription==null) {
			throw new RuntimeException("Subscription of given user not found");
		}
		userSubscriptionRepository.delete(userSubscription);
		
	}

}
