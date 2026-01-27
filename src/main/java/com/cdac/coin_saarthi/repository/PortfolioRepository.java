package com.cdac.coin_saarthi.repository;

import com.cdac.coin_saarthi.model.Portfolio;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.*;

public interface PortfolioRepository extends JpaRepository<Portfolio, Long> {

    List<Portfolio> findByAccountId(Long accountId);

    Optional<Portfolio> findByAccountIdAndCryptoCurrency_CryptoId(Long accountId, Long cryptoId);
}
