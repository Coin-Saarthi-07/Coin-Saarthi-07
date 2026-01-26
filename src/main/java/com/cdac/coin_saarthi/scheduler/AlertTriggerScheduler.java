//package com.cdac.coin_saarthi.scheduler;
//
//import com.cdac.coin_saarthi.service.AlertTriggerService;
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//import org.springframework.scheduling.annotation.Scheduled;
//import org.springframework.stereotype.Component;
//
//@Component
//public class AlertTriggerScheduler {
//
//    private static final Logger log =
//            LoggerFactory.getLogger(AlertTriggerScheduler.class);
//
//    private final AlertTriggerService alertTriggerService;
//
//    public AlertTriggerScheduler(AlertTriggerService alertTriggerService) {
//        this.alertTriggerService = alertTriggerService;
//    }
//
//    @Scheduled(fixedDelay = 30000) // 30 seconds
//    public void run() {
//        try {
//            alertTriggerService.evaluateAlerts();
//        } catch (Exception ex) {
//            log.error("Alert trigger scheduler failed", ex);
//        }
//    }
//}
