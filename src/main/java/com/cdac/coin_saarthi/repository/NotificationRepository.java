package com.cdac.coin_saarthi.repository;

import com.cdac.coin_saarthi.model.Notification;
import com.cdac.coin_saarthi.model.NotificationEnums.NotificationMedium;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NotificationRepository extends JpaRepository<Notification, Long> {
    List<Notification> findByUserUserIdAndMediumOrderBySentAtDesc(Long userId, NotificationMedium medium);
}
