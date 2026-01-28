package com.cdac.coin_saarthi.service;

import com.cdac.coin_saarthi.repository.AlertLogRepository;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class AlertLogServiceImpl implements AlertLogService {

    private final AlertLogRepository alertLogRepository;

    public AlertLogServiceImpl(AlertLogRepository alertLogRepository) {
        this.alertLogRepository = alertLogRepository;
    }

    // 1️. Logs by alert
    @Override
    public List<Map<String, Object>> getLogsByAlert(Long alertId) {

        var logs = alertLogRepository
                .findByAlertIdOrderByTriggeredTimeDesc(alertId);

        if (logs.isEmpty()) {
            throw new RuntimeException("No logs found for this alert");
        }

        return logs.stream()
                .map(l -> {
                    Map<String, Object> map = new HashMap<>();
                    map.put("alertLogId", l.getAlertLogId());
                    map.put("triggeredPrice", l.getTriggeredPrice());
                    map.put("triggeredTime", l.getTriggeredTime());
                    return map;
                })
                .toList();
    }

    // 2️. Logs by user
    @Override
    public List<Map<String, Object>> getLogsByUser(Long userId) {

        var logs = alertLogRepository
                .findByAlert_UserIdOrderByTriggeredTimeDesc(userId);

        if (logs.isEmpty()) {
            throw new RuntimeException("No alert logs found for this user");
        }

        return logs.stream()
                .map(l -> {
                    Map<String, Object> map = new HashMap<>();
                    map.put("alertLogId", l.getAlertLogId());
                    map.put("alertId", l.getAlertId());
                    map.put("triggeredPrice", l.getTriggeredPrice());
                    map.put("triggeredTime", l.getTriggeredTime());
                    return map;
                })
                .toList();
    }

    // 3️.Latest log
    @Override
    public Map<String, Object> getLatestLog(Long alertId) {

        var log = alertLogRepository
                .findFirstByAlertIdOrderByTriggeredTimeDesc(alertId)
                .orElseThrow(() -> new RuntimeException("No trigger history found"));

        return Map.of(
                "alertLogId", log.getAlertLogId(),
                "triggeredPrice", log.getTriggeredPrice(),
                "triggeredTime", log.getTriggeredTime()
        );
    }
}
