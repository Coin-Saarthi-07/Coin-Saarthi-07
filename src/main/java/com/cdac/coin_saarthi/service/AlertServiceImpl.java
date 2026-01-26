package com.cdac.coin_saarthi.service;

import com.cdac.coin_saarthi.dto.AlertRequestDTO;
import com.cdac.coin_saarthi.dto.UpdateAlertDTO;
import com.cdac.coin_saarthi.model.Alert;
import com.cdac.coin_saarthi.model.AlertEnums;
import com.cdac.coin_saarthi.repository.AlertRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AlertServiceImpl implements AlertService {

    private final AlertRepository alertRepository;

    public AlertServiceImpl(AlertRepository alertRepository) {
        this.alertRepository = alertRepository;
    }

    @Override
    public Alert createAlert(AlertRequestDTO request) {

        Alert alert = new Alert();
        alert.setUserId(request.getUserId());
        alert.setCryptoId(request.getCryptoId());
        alert.setDuration(request.getDuration());
        alert.setTargetPrice(request.getTargetPrice());
        alert.setCondition(request.getAlert_condition());
        alert.setType(request.getType());
        alert.setStatus(AlertEnums.AlertStatus.Active);

        return alertRepository.save(alert);
    }

    @Override
    public List<Alert> getAllAlerts() {
        return alertRepository.findAll();
    }

    @Override
    public void deleteAlert(Long alertId) {
        alertRepository.deleteById(alertId);
    }
    @Override
    public Alert getById(Long id) {
        return alertRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Alert not found"));
    }

    @Override
    public Alert updateAlert(Long id, UpdateAlertDTO dto) {

        Alert alert = getById(id);

        alert.setTargetPrice(dto.getTargetPrice());
        alert.setCondition(dto.getCondition());
        alert.setStatus(dto.getStatus());
        alert.setType(dto.getType());

        return alertRepository.save(alert);
    }
}
