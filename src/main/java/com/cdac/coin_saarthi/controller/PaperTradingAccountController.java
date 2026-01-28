package com.cdac.coin_saarthi.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cdac.coin_saarthi.service.PaperTradingAccountService;

@RestController
@RequestMapping("/paper/account")
public class PaperTradingAccountController {

    private final PaperTradingAccountService service;

    public PaperTradingAccountController(PaperTradingAccountService service) {
        this.service = service;
    }

    @PostMapping("/{userId}")
    public ResponseEntity<?> create(@PathVariable Long userId) {
        return ResponseEntity.ok(service.createAccount(userId));
    }

    @GetMapping("/{userId}")
    public ResponseEntity<?> get(@PathVariable Long userId) {
        return ResponseEntity.ok(service.getAccountByUserId(userId));
    }

}
