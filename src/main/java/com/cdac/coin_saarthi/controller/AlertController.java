package com.cdac.coin_saarthi.controller;

import java.util.List;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cdac.coin_saarthi.dto.AlertRequestDTO;
import com.cdac.coin_saarthi.dto.UpdateAlertDTO;
import com.cdac.coin_saarthi.model.Alert;
import com.cdac.coin_saarthi.service.AlertService;

import jakarta.annotation.security.PermitAll;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/alerts")
@PreAuthorize("hasAnyAuthority('USER','SUBSCRIBER')")
public class AlertController {

    private final AlertService alertService;

    public AlertController(AlertService alertService) {
        this.alertService = alertService;
    }
    //create alert
    @PostMapping
    public Alert createAlert(@Valid @RequestBody AlertRequestDTO request) {
        return alertService.createAlert(request);
    }

    //get all alerts
    @GetMapping
    public List<Alert> getAllAlerts() {
        return alertService.getAllAlerts();
    }

    //get by id
    @GetMapping("/{id}")
    public Alert getAlertById(@PathVariable Long id) {
        return alertService.getById(id);
    }


    //update alert
    @PutMapping("/{id}")
    public Alert updateAlert(
            @PathVariable Long id,
            @Valid @RequestBody UpdateAlertDTO dto
    ) {
        return alertService.updateAlert(id, dto);
    }


   //delete alert
    @DeleteMapping("/{id}")
    public void deleteAlert(@PathVariable Long id) {
        alertService.deleteAlert(id);
    }
}
