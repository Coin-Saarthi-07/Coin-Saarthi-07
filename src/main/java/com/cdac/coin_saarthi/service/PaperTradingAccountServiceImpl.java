package com.cdac.coin_saarthi.service;

import com.cdac.coin_saarthi.model.PaperTradingAccount;
import com.cdac.coin_saarthi.model.User;
import com.cdac.coin_saarthi.repository.PaperTradingAccountRepository;
import com.cdac.coin_saarthi.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Service
public class PaperTradingAccountServiceImpl implements PaperTradingAccountService {

    private final PaperTradingAccountRepository accountRepository;
    private final UserRepository userRepository;

    public PaperTradingAccountServiceImpl(
            PaperTradingAccountRepository accountRepository,
            UserRepository userRepository) {
        this.accountRepository = accountRepository;
        this.userRepository = userRepository;
    }

//    @Override
    public PaperTradingAccount createAccount(Long userId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        PaperTradingAccount account = new PaperTradingAccount();
        account.setUser(user);
        account.setVirtualBalance(new BigDecimal("100000"));
        account.setCreatedAt(LocalDateTime.now());
        account.setLastUpdated(LocalDateTime.now());

        return accountRepository.save(account);
    }

    @Override
    public PaperTradingAccount getAccountByUserId(Long userId) {
        return accountRepository.findByUser_UserId(userId)
                .orElseThrow(() -> new RuntimeException("Paper trading account not found"));
    }
    @Override
    public void resetAccount(Long userId) {
        PaperTradingAccount account = getAccountByUserId(userId);
        account.setVirtualBalance(new BigDecimal("100000"));
        account.setLastUpdated(LocalDateTime.now());
        accountRepository.save(account);
    }
}
