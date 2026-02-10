package com.cdac.coin_saarthi.service;

import com.cdac.coin_saarthi.integration.CoinGeckoClient;
import com.cdac.coin_saarthi.model.CryptoCurrency;
import com.cdac.coin_saarthi.repository.CryptoCurrencyRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Service
public class CoinGeckoServiceImpl implements CoinGeckoService {

    private final CoinGeckoClient coinGeckoClient;
    private final CryptoCurrencyRepository cryptoRepo;

    public CoinGeckoServiceImpl(
            CoinGeckoClient coinGeckoClient,
            CryptoCurrencyRepository cryptoRepo
    ) {
        this.coinGeckoClient = coinGeckoClient;
        this.cryptoRepo = cryptoRepo;
    }

    @Override
    @Transactional
    public void syncTop100Coins() {

        List<Map<String, Object>> coins =
                coinGeckoClient.fetchTop100Coins();

        for (Map<String, Object> coin : coins) {

            String geckoId = (String) coin.get("id");

            // ---------- SYMBOL (SAFE) ----------
            String rawSymbol = ((String) coin.get("symbol")).toUpperCase();
            String symbol = rawSymbol.replaceAll("[^A-Z0-9-]", "");

            if (symbol.length() < 2) {
                continue; // skip invalid symbols
            }

            // ---------- NAME (CRITICAL FIX) ----------
            String rawName = (String) coin.get("name");

            String name = rawName
                    .replaceAll("[^A-Za-z ]", "")  // remove digits & symbols
                    .replaceAll("\\s+", " ")        // normalize spaces
                    .trim();

            if (name.length() < 2) {
                continue; // skip invalid names
            }

            // ---------- PRICE ----------
            Double price = ((Number) coin.get("current_price")).doubleValue();

            CryptoCurrency currency =
                    cryptoRepo.findByCoinGeckoId(geckoId)
                            .orElse(new CryptoCurrency());

            currency.setCoinGeckoId(geckoId);
            currency.setCurrencySymbol(symbol);
            currency.setCurrencyName(name);
            currency.setCurrencyPrice(price);
            currency.setLastUpdated(LocalDateTime.now());

            cryptoRepo.save(currency);
        }
    }
}
