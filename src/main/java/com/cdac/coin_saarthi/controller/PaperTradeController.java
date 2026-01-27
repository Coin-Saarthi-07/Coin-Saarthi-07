package com.cdac.coin_saarthi.controller;


import com.cdac.coin_saarthi.service.PaperTradeService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

        service.buyCrypto(userId, cryptoId, quantity);
        return ResponseEntity.ok("Buy order executed");
    }



    @PostMapping("/sell")
    public ResponseEntity<?> sell(
            @RequestParam Long userId,
            @RequestParam Long cryptoId,
            @RequestParam BigDecimal quantity) {

        service.sellCrypto(userId, cryptoId, quantity);
        return ResponseEntity.ok("Sell order executed");
    }
}
