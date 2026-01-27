package com.cdac.coin_saarthi.service;

import com.cdac.coin_saarthi.model.Notification;
import com.cdac.coin_saarthi.model.NotificationEnums.NotificationStatus;
import com.cdac.coin_saarthi.repository.NotificationRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NotificationProcessorService {

    private final NotificationRepository notificationRepository;
    private final NotificationDispatcherService dispatcherService;

    public NotificationProcessorService(
            NotificationRepository notificationRepository,
            NotificationDispatcherService dispatcherService
    ) {
        this.notificationRepository = notificationRepository;
        this.dispatcherService = dispatcherService;
    }

    public void processPendingNotifications() {

        List<Notification> pendingNotifications =
                notificationRepository.findAll().stream()
                        .filter(n -> n.getStatus() == NotificationStatus.Pending)
                        .toList();

        for (Notification notification : pendingNotifications) {
            dispatcherService.dispatch(
                    notification,
                    notification.getUser().getEmail(),
                    notification.getUser().getPhoneNo()
            );
        }
    }
}
