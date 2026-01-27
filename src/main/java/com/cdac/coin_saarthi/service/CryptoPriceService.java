package com.cdac.coin_saarthi.service;

import com.cdac.coin_saarthi.integration.CoinGeckoClient;
import com.cdac.coin_saarthi.model.CryptoCurrency;
import com.cdac.coin_saarthi.repository.CryptoCurrencyRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class CryptoPriceService {

    private final CryptoCurrencyRepository cryptoRepo;
    private final CoinGeckoClient coinGeckoClient;

    public CryptoPriceService(
            CryptoCurrencyRepository cryptoRepo,
            CoinGeckoClient coinGeckoClient
    ) {
        this.cryptoRepo = cryptoRepo;
        this.coinGeckoClient = coinGeckoClient;
    }

    @Transactional
    public void refreshPrices() {

        List<CryptoCurrency> currencies = cryptoRepo.findAll();

        for (CryptoCurrency currency : currencies) {

            Double price =
                    coinGeckoClient.fetchUsdPrice(currency.getCoinGeckoId());

            // 🚨 HARD GUARD
            if (price == null) {
                continue; // DO NOT UPDATE DB
            }

            currency.setCurrencyPrice(price);
            currency.setLastUpdated(LocalDateTime.now());

            cryptoRepo.save(currency);
        }
    }
}
