package com.cdac.coin_saarthi.controller;

import com.cdac.coin_saarthi.dto.AlertRequestDTO;
import com.cdac.coin_saarthi.dto.UpdateAlertDTO;
import com.cdac.coin_saarthi.model.Alert;
import com.cdac.coin_saarthi.service.AlertService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/alerts")
public class AlertController {

    private final AlertService alertService;

    public AlertController(AlertService alertService) {
        this.alertService = alertService;
    }

    
    @PostMapping
    public Alert createAlert(@Valid @RequestBody AlertRequestDTO request) {
        return alertService.createAlert(request);
    }

    
    @GetMapping
    public List<Alert> getAllAlerts() {
        return alertService.getAllAlerts();
    }

    
    @GetMapping("/{id}")
    public Alert getAlertById(@PathVariable Long id) {
        return alertService.getById(id);
    }

    
    @PutMapping("/{id}")
    public Alert updateAlert(
            @PathVariable Long id,
            @Valid @RequestBody UpdateAlertDTO dto
    ) {
        return alertService.updateAlert(id, dto);
    }

   
    @DeleteMapping("/{id}")
    public void deleteAlert(@PathVariable Long id) {
        alertService.deleteAlert(id);
    }
}
