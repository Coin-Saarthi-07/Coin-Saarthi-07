package com.cdac.coin_saarthi.dto;

import com.cdac.coin_saarthi.model.NotificationEnums;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateNotificationDTO {

    @NotNull
    private Long userId;

    @NotNull
    private Long alertId;

    @NotNull
    private NotificationEnums.NotificationMedium medium;

    @NotNull
    private String message;
}
