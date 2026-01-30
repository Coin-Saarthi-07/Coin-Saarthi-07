package com.cdac.coin_saarthi.controller;

import com.cdac.coin_saarthi.service.CoinGeckoService;

import jakarta.annotation.security.PermitAll;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/coingecko")
@PermitAll
public class CoinGeckoController {

    private final CoinGeckoService coinGeckoService;

    public CoinGeckoController(CoinGeckoService coinGeckoService) {
        this.coinGeckoService = coinGeckoService;
    }

    // POST: /api/coingecko/sync
    @PostMapping("/sync")
    public String syncCoins() {
        coinGeckoService.syncTop100Coins();
        return "Top 100 cryptocurrencies synced successfully";
    }
}
