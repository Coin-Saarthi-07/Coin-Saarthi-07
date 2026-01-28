package com.cdac.coin_saarthi.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cdac.coin_saarthi.model.Portfolio;

public interface PortfolioRepository extends JpaRepository<Portfolio, Long> {

    List<Portfolio> findByAccountId(Long accountId);

    Optional<Portfolio> findByPaperTradingAccount_AccountIdAndCryptoCurrency_CryptoId(Long accountId, Long cryptoId);
    
}
