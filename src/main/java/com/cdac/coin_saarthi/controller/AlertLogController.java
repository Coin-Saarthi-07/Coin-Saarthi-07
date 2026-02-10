package com.cdac.coin_saarthi.controller;

import com.cdac.coin_saarthi.service.AlertLogService;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/alert-logs")
@PreAuthorize("hasAnyAuthority('USER','SUBSCRIBER','ADMIN')")
public class AlertLogController {

    private final AlertLogService alertLogService;

    public AlertLogController(AlertLogService alertLogService) {
        this.alertLogService = alertLogService;
    }

    //  Get logs for a specific alert
    // GET: /api/alert-logs/alert/{alertId}
    @GetMapping("/alert/{alertId}")
    public List<Map<String, Object>> getLogsByAlert(
            @PathVariable Long alertId
    ) {
        return alertLogService.getLogsByAlert(alertId);
    }

    //  Get logs for a user
    // GET: /api/alert-logs/user/{userId}
    @GetMapping("/user/{userId}")
    public List<Map<String, Object>> getLogsByUser(
            @PathVariable Long userId
    ) {
        return alertLogService.getLogsByUser(userId);
    }

    //  Get latest log for an alert
    // GET: /api/alert-logs/alert/{alertId}/latest
    @GetMapping("/alert/{alertId}/latest")
    public Map<String, Object> getLatestLog(
            @PathVariable Long alertId
    ) {
        return alertLogService.getLatestLog(alertId);
    }
}
