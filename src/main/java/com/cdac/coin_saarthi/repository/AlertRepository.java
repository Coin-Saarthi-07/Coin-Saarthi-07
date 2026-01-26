package com.cdac.coin_saarthi.repository;

import com.cdac.coin_saarthi.model.Alert;
import com.cdac.coin_saarthi.model.AlertEnums.AlertStatus;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AlertRepository extends JpaRepository<Alert, Long> {
	List<Alert> findByStatus(AlertStatus status);

}
