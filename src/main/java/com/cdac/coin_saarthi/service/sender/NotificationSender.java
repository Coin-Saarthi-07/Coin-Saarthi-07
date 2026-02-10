package com.cdac.coin_saarthi.service.sender;

import com.cdac.coin_saarthi.model.Notification;
import com.cdac.coin_saarthi.model.NotificationEnums.NotificationMedium;

public interface NotificationSender {

    NotificationMedium supports();

    void send(Notification notification) throws Exception;
}
