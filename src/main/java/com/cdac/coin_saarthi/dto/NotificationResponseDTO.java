package com.cdac.coin_saarthi.dto;

import com.cdac.coin_saarthi.model.NotificationEnums.NotificationMedium;
import com.cdac.coin_saarthi.model.NotificationEnums.NotificationStatus;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class NotificationResponseDTO {
    private Long notificationId;
    private Long userId;
    private Long alertId;
    private NotificationMedium medium;
    private NotificationStatus status;
    private LocalDateTime sentAt;
    private String message;
}
