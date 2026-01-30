package com.cdac.coin_saarthi.scheduler;

import com.cdac.coin_saarthi.model.Notification;
import com.cdac.coin_saarthi.model.NotificationEnums.NotificationStatus;
import com.cdac.coin_saarthi.model.User;
import com.cdac.coin_saarthi.repository.NotificationRepository;
import com.cdac.coin_saarthi.repository.UserRepository;
import com.cdac.coin_saarthi.service.NotificationDispatcherService;

import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@EnableScheduling
public class NotificationScheduler {

	private final NotificationRepository notificationRepository;
	private final NotificationDispatcherService dispatcherService;
	private final UserRepository userRepository;


	public NotificationScheduler(NotificationRepository notificationRepository,
			NotificationDispatcherService dispatcherService, UserRepository userRepository) {
		this.notificationRepository = notificationRepository;
		this.dispatcherService = dispatcherService;
		this.userRepository = userRepository;
	}

	@Scheduled(fixedDelay = 10_000)
	public void processPendingNotifications() {


		List<Notification> pending = notificationRepository.findAll().stream()
				.filter(n -> n.getStatus() == NotificationStatus.Pending).toList();

		for (Notification notification : pending) {

			User user = userRepository.findById(notification.getUser().getUserId())
					.orElseThrow(() -> new RuntimeException("User not found"));

			dispatcherService.dispatch(notification, user.getEmail(), user.getPhoneNo());
		}
	}
}
