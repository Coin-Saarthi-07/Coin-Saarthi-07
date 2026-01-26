package com.cdac.coin_saarthi.repository;

import com.cdac.coin_saarthi.model.AlertLog;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface AlertLogRepository extends JpaRepository<AlertLog, Long> {

    List<AlertLog> findByAlertIdOrderByTriggeredTimeDesc(Long alertId);

    List<AlertLog> findByAlert_UserIdOrderByTriggeredTimeDesc(Long userId);

    Optional<AlertLog> findFirstByAlertIdOrderByTriggeredTimeDesc(Long alertId);
}
