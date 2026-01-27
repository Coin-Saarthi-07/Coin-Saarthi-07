package com.cdac.coin_saarthi.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cdac.coin_saarthi.model.CryptoCurrency;

public interface CryptoCurrencyRepository
        extends JpaRepository<CryptoCurrency, Long> {

    Optional<CryptoCurrency> findByCurrencySymbol(String symbol);

    List<CryptoCurrency>
    findByCurrencyNameContainingIgnoreCaseOrCurrencySymbolContainingIgnoreCase(
            String name,
            String symbol
    );

    Optional<CryptoCurrency> findByCoinGeckoId(String geckoId);
}
