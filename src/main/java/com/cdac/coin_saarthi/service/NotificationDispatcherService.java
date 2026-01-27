package com.cdac.coin_saarthi.service;

import com.cdac.coin_saarthi.model.Notification;
import com.cdac.coin_saarthi.model.NotificationEnums.NotificationMedium;
import com.cdac.coin_saarthi.model.NotificationEnums.NotificationStatus;
import com.cdac.coin_saarthi.repository.NotificationRepository;
import com.cdac.coin_saarthi.service.sender.EmailSender;
import com.cdac.coin_saarthi.service.sender.SmsSender;
import com.cdac.coin_saarthi.service.sender.WhatsAppSender;

import org.springframework.stereotype.Service;

@Service
public class NotificationDispatcherService {

    private final EmailSender emailSender;
    private final SmsSender smsSender;
    private final WhatsAppSender whatsAppSender;
    private final NotificationRepository notificationRepository;
    
    private String normalizePhone(String phone) {
        if (phone.startsWith("+")) {
            return phone;
        }
        return "+91" + phone;
    }


    public NotificationDispatcherService(
            EmailSender emailSender,
            SmsSender smsSender,
            NotificationRepository notificationRepository
    ) {
        this.emailSender = emailSender;
        this.smsSender = smsSender;
        this.notificationRepository = notificationRepository;
        this.whatsAppSender = null; // disabled intentionally
    }


    public void dispatch(Notification notification, String email, String phone) {
        try {
        	switch (notification.getMedium()) {

            case EMAIL -> emailSender.send(
                    email,
                    "Crypto Alert Triggered",
                    notification.getMessage()
            );

            case SMS -> smsSender.send(
                    normalizePhone(phone),
                    notification.getMessage()
            );

            case APP -> {
                // intentionally disabled
                System.out.println("ℹ App notification skipped");
            }
        }


            notification.setStatus(NotificationStatus.Sent);

        } catch (Exception ex) {
            ex.printStackTrace();
            notification.setStatus(NotificationStatus.Failed);
        }

        notificationRepository.save(notification);
    }

}
