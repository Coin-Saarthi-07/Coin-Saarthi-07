package com.cdac.coin_saarthi.service;

import com.cdac.coin_saarthi.dto.CreateNotificationDTO;
import com.cdac.coin_saarthi.dto.UpdateNotificationDTO;
import com.cdac.coin_saarthi.model.Notification;

import java.util.List;

public interface NotificationService {

    List<Notification> getAll();

    Notification getById(Long id);

    Notification create(CreateNotificationDTO dto);

    Notification updateStatus(Long id, UpdateNotificationDTO dto);

    boolean delete(Long id);
}
