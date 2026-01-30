package com.cdac.coin_saarthi.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cdac.coin_saarthi.model.PaperTradingAccount;
import com.cdac.coin_saarthi.model.User;

public interface PaperTradingAccountRepository extends JpaRepository<PaperTradingAccount, Long> {

    Optional<PaperTradingAccount> findByUser_UserId(Long userId);
    boolean existsByUser_UserId(Long userId);
    

}
