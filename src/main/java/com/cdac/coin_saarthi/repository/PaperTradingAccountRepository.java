package com.cdac.coin_saarthi.repository;

import com.cdac.coin_saarthi.model.PaperTradingAccount;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PaperTradingAccountRepository extends JpaRepository<PaperTradingAccount, Long> {

    Optional<PaperTradingAccount> findByUser_UserId(Long userId);

}
