package com.cdac.coin_saarthi.controller;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;

@RestController
@RequestMapping("/paper/trade")
public class PaperTradeController {

    private final PaperTradeService service;

    public PaperTradeController(PaperTradeService service) {
        this.service = service;
    }

    @PostMapping("/buy")
    public ResponseEntity<?> buy(
            @RequestParam Long userId,
            @RequestParam Long cryptoId,
            @RequestParam BigDecimal quantity) {

        service.buy(userId, cryptoId, quantity);
        return ResponseEntity.ok("Buy order executed");
    }
}
