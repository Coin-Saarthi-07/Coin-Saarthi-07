package com.cdac.coin_saarthi.service;
import com.cdac.coin_saarthi.dto.AlertRequestDTO;
import com.cdac.coin_saarthi.dto.UpdateAlertDTO;
import com.cdac.coin_saarthi.model.Alert;

import java.util.List;

public interface AlertService {


    Alert createAlert(AlertRequestDTO request);

    List<Alert> getAllAlerts();
    Alert getById(Long id);

    Alert updateAlert(Long id, UpdateAlertDTO dto);


    void deleteAlert(Long alertId);
}
