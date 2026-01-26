package com.cdac.coin_saarthi.service;

import com.cdac.coin_saarthi.dto.CreateNotificationDTO;
import com.cdac.coin_saarthi.dto.UpdateNotificationDTO;
import com.cdac.coin_saarthi.model.Notification;
import com.cdac.coin_saarthi.model.NotificationEnums;
import com.cdac.coin_saarthi.repository.NotificationRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class NotificationServiceImpl implements NotificationService {

    private final NotificationRepository notificationRepository;

    public NotificationServiceImpl(NotificationRepository notificationRepository) {
        this.notificationRepository = notificationRepository;
    }

    @Override
    public List<Notification> getAll() {
        return notificationRepository.findAll();
    }

    @Override
    public Notification getById(Long id) {
        return notificationRepository.findById(id).orElse(null);
    }

    @Override
    public Notification create(CreateNotificationDTO dto) {

        Notification notification = new Notification();
        notification.setUserId(dto.getUserId());
        notification.setAlertId(dto.getAlertId());
        notification.setMedium(dto.getMedium());
        notification.setMessage(dto.getMessage());
        notification.setStatus(NotificationEnums.NotificationStatus.Sent);
        notification.setSentAt(LocalDateTime.now());

        return notificationRepository.save(notification);
    }

    @Override
    public Notification updateStatus(Long id, UpdateNotificationDTO dto) {

        Notification notification = notificationRepository.findById(id).orElse(null);
        if (notification == null) return null;

        notification.setStatus(dto.getStatus());
        return notificationRepository.save(notification);
    }

    @Override
    public boolean delete(Long id) {

        Notification notification = notificationRepository.findById(id).orElse(null);
        if (notification == null) return false;

        notificationRepository.delete(notification);
        return true;
    }
}
