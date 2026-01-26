package com.cdac.coin_saarthi.dto;

import com.cdac.coin_saarthi.model.NotificationEnums;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateNotificationDTO {

    @NotNull
    private NotificationEnums.NotificationStatus status;
}
