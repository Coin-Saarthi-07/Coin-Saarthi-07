package com.cdac.coin_saarthi.contoller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.cdac.coin_saarthi.dto.ApiResponseDTO;
import com.cdac.coin_saarthi.model.UserSubscription;
import com.cdac.coin_saarthi.service.UserSubscriptionService;

@RestController
@RequestMapping("/crypto/user-subscription")
public class UserSubscriptionController {
	
	private final UserSubscriptionService userSubscriptionService;
	
	public UserSubscriptionController(UserSubscriptionService userSubscriptionService) {
		this.userSubscriptionService = userSubscriptionService;
	}
	
	//Add User Subscription
	@PostMapping
	public ResponseEntity<?> addUserSubscription(@RequestBody UserSubscription subscription){
		userSubscriptionService.addSubscription(subscription);
		return ResponseEntity.status(HttpStatus.CREATED)
                .body(new ApiResponseDTO("User Subscription added Successfully!!", "Success"));
	}
	
	//Get User Subscription by UserId
	@GetMapping("{userId}")
	public ResponseEntity<List<UserSubscription>> getByUserId(@PathVariable Long userId){
			return ResponseEntity.ok(userSubscriptionService.getByUserId(userId));
	}
	
	//Get User Subscription by UserId
	@GetMapping("{subId}")
	public ResponseEntity<UserSubscription> getById(@PathVariable Long subId){
			return ResponseEntity.ok(userSubscriptionService.getById(subId));
	}
	
	//Get All User Subscription
	@GetMapping
	public ResponseEntity<List<UserSubscription>> getAllUserSubscription(){
		return ResponseEntity.ok(userSubscriptionService.getAllUserSubscription());
	}
	
	//Update User Subscription by status
	@PutMapping("/{id}/status")
    public ResponseEntity<UserSubscription> updateStatus(@PathVariable Long id,@RequestParam String status) {
        return ResponseEntity.ok(userSubscriptionService.updateStatus(id, status));
    }
	
	//delete User Subscription 
	@DeleteMapping("/{id}")
	 public ResponseEntity<String> deleteSubscription(@PathVariable Long id) {
		userSubscriptionService.deleteSubscription(id);
        return ResponseEntity.ok("User deleted successfully");
    }

}
