package com.cdac.coin_saarthi.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cdac.coin_saarthi.dto.AccountResponseDTO;
import com.cdac.coin_saarthi.service.PaperTradingAccountService;

import jakarta.annotation.security.PermitAll;

@RestController
@RequestMapping("/paper/account")
@PreAuthorize("hasAnyAuthority('SUBSCRIBER')")
public class PaperTradingAccountController {

    private final PaperTradingAccountService service;

    public PaperTradingAccountController(PaperTradingAccountService service) {
        this.service = service;
    }

    @PostMapping("/paper-trading/{userId}")
    public ResponseEntity<AccountResponseDTO> createAccount(
            @PathVariable Long userId) {
        return ResponseEntity.ok(service.createAccount(userId));
    }

    @GetMapping("/{userId}")
    public ResponseEntity<?> get(@PathVariable Long userId) {
        return ResponseEntity.ok(service.getAccountByUserId(userId));
    }

    @PostMapping("/reset/{userId}")
    public ResponseEntity<Void> reset(@PathVariable Long userId) {
        service.resetAccount(userId);
        return ResponseEntity.ok().build();
    }

}
