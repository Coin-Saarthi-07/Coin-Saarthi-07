package com.cdac.coin_saarthi.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
        return ResponseEntity.ok(service.getAccount(userId));
    }

}
