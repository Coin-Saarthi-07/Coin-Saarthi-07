package com.cdac.coin_saarthi.service;

import org.springframework.stereotype.Service;

@Service
public class MarketPriceService {

    public double getPrice(Long cryptoId) {
        if (cryptoId == 1) return 30000;  
        if (cryptoId == 2) return 2000;  
        return 100;
    }
}
