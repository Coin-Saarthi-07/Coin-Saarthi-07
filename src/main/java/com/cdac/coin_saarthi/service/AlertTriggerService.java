//package com.cdac.coin_saarthi.service;
//
//import com.cdac.coin_saarthi.model.*;
//import com.cdac.coin_saarthi.model.AlertEnums.AlertStatus;
//import com.cdac.coin_saarthi.model.AlertEnums.ConditionType;
//import com.cdac.coin_saarthi.repository.*;
//import org.springframework.stereotype.Service;
//import org.springframework.transaction.annotation.Transactional;
//
//import java.time.LocalDateTime;
//import java.util.List;
//
//@Service
//public class AlertTriggerService {
//
//    private final AlertRepository alertRepository;
//    private final CryptoCurrencyRepository cryptoCurrencyRepository;
//    private final AlertLogRepository alertLogRepository;
//    private final NotificationRepository notificationRepository;
//
//    public AlertTriggerService(
//            AlertRepository alertRepository,
//            CryptoCurrencyRepository cryptoCurrencyRepository,
//            AlertLogRepository alertLogRepository,
//            NotificationRepository notificationRepository
//    ) {
//        this.alertRepository = alertRepository;
//        this.cryptoCurrencyRepository = cryptoCurrencyRepository;
//        this.alertLogRepository = alertLogRepository;
//        this.notificationRepository = notificationRepository;
//    }
//
//    @Transactional
//    public void evaluateAlerts() {
//
//        List<Alert> alerts =
//                alertRepository.findByStatus(AlertStatus.Active);
//
//        for (Alert alert : alerts) {
//
//            var crypto = cryptoCurrencyRepository
//                    .findById(alert.getCryptoId())
//                    .orElse(null);
//
//            if (crypto == null) continue;
//
//            boolean triggered =
//                    (alert.getCondition() == ConditionType.Buy &&
//                            crypto.getCurrencyPrice().compareTo(alert.getTargetPrice()) <= 0)
//                 || (alert.getCondition() == ConditionType.Sell &&
//                            crypto.getCurrencyPrice().compareTo(alert.getTargetPrice()) >= 0);
//
//            if (!triggered) continue;
//
//            // 1️⃣ Mark alert as triggered
//            alert.setStatus(AlertStatus.Triggered);
//
//            // 2️⃣ Log trigger
//            AlertLog log = new AlertLog();
//            log.setAlertId(alert.getAlertId());
//            log.setTriggeredPrice(crypto.getCurrencyPrice());
//            log.setTriggeredTime(LocalDateTime.now());
//
//            alertLogRepository.save(log);
//
//            // 3️⃣ Notification message
//            String message =
//                    "Alert triggered for " + crypto.getCurrencyName()
//                    + " at price " + crypto.getCurrencyPrice();
//
//            // 4️⃣ Create notifications
//            notificationRepository.saveAll(List.of(
//                    Notification.app(alert.getUserId(), alert.getAlertId(), message),
//                    Notification.email(alert.getUserId(), alert.getAlertId(), message),
//                    Notification.sms(alert.getUserId(), alert.getAlertId(), message)
//            ));
//        }
//    }
//}
