package com.cdac.coin_saarthi.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.cdac.coin_saarthi.dto.CreateNotificationDTO;
import com.cdac.coin_saarthi.dto.UpdateNotificationDTO;
import com.cdac.coin_saarthi.dto.NotificationResponseDTO;
import com.cdac.coin_saarthi.exception.ResourceNotFoundException;
import com.cdac.coin_saarthi.model.Alert;
import com.cdac.coin_saarthi.model.Notification;
import com.cdac.coin_saarthi.model.NotificationEnums;
import com.cdac.coin_saarthi.model.User;
import com.cdac.coin_saarthi.repository.AlertRepository;
import com.cdac.coin_saarthi.repository.NotificationRepository;

@Service
public class NotificationServiceImpl implements NotificationService {

    private final NotificationRepository notificationRepository;
    private final AlertRepository alertRepository;

    public NotificationServiceImpl(NotificationRepository notificationRepository, AlertRepository alertRepository) {
        this.notificationRepository = notificationRepository;
        this.alertRepository = alertRepository;
    }

    @Override
    public List<Notification> getAll() {
        List<Notification> getAll = notificationRepository.findAll();
        if (getAll.isEmpty()) {
            throw new ResourceNotFoundException("Notification failed");
        }
        return getAll;
    }

    @Override
    public Notification getById(Long id) {
        return notificationRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Notification of given id not found"));
    }

    @Override
    public List<NotificationResponseDTO> getByUser(Long userId) {
        System.out.println("Fetching APP notifications for userId: " + userId);
        List<Notification> list = notificationRepository.findByUserUserIdAndMediumOrderBySentAtDesc(userId, NotificationEnums.NotificationMedium.APP);
        System.out.println("Found " + list.size() + " notifications for user " + userId);

        return list.stream().map(n -> {
            NotificationResponseDTO dto = new NotificationResponseDTO();
            dto.setNotificationId(n.getNotificationId());
            dto.setUserId(n.getUser() != null ? n.getUser().getUserId() : null);
            dto.setAlertId(n.getAlert() != null ? n.getAlert().getAlertId() : null);
            dto.setMedium(n.getMedium());
            dto.setStatus(n.getStatus());
            dto.setSentAt(n.getSentAt());
            dto.setMessage(n.getMessage());
            return dto;
        }).collect(Collectors.toList());
    }

    @Override
    public Notification create(CreateNotificationDTO dto) {
        Alert alert = alertRepository.findById(dto.getAlertId())
                .orElseThrow(() -> new ResourceNotFoundException("Alert not found"));
        User user = alert.getUser();

        if (user == null || user.getUserId() == null) {
            throw new ResourceNotFoundException("Alert has no valid user");
        }
        Notification notification = new Notification();
        notification.setAlert(alert);
        notification.setUser(user);
        notification.setMedium(dto.getMedium());
        notification.setMessage(dto.getMessage());
        notification.setStatus(NotificationEnums.NotificationStatus.Sent);
        notification.setSentAt(LocalDateTime.now());

        Notification notify = notificationRepository.save(notification);
        if (notify == null) {
            throw new ResourceNotFoundException("Notification failed");
        }
        return notify;
    }

    @Override
    public Notification updateStatus(Long id, UpdateNotificationDTO dto) {
        Notification notification = notificationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Notification of given id not found"));

        notification.setStatus(dto.getStatus());
        Notification updateNot = notificationRepository.save(notification);
        if (updateNot == null) {
            throw new ResourceNotFoundException("Notification Update failed");
        }
        return updateNot;
    }

    @Override
    public boolean delete(Long id) {
        Notification notification = notificationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Notification of given id not found"));

        notificationRepository.delete(notification);
        return true;
    }
}
