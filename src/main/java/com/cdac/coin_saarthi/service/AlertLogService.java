package com.cdac.coin_saarthi.service;

import java.util.List;
import java.util.Map;

public interface AlertLogService {

    List<Map<String, Object>> getLogsByAlert(Long alertId);

    List<Map<String, Object>> getLogsByUser(Long userId);

    Map<String, Object> getLatestLog(Long alertId);
}
