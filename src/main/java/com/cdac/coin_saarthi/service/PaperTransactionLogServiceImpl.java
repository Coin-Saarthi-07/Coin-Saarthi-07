package com.cdac.coin_saarthi.service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.cdac.coin_saarthi.enums.TransactionType;
import com.cdac.coin_saarthi.model.CryptoCurrency;
import com.cdac.coin_saarthi.model.PaperTradingAccount;
import com.cdac.coin_saarthi.model.PaperTransactionLog;
import com.cdac.coin_saarthi.repository.PaperTransactionLogRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class PaperTransactionLogServiceImpl
        implements PaperTransactionLogService {

    private final PaperTransactionLogRepository transactionRepo;

    public PaperTransactionLogServiceImpl(
            PaperTransactionLogRepository transactionRepo) {
        this.transactionRepo = transactionRepo;
    }

    @Override
    public void logTransaction(
            PaperTradingAccount account,
            CryptoCurrency crypto,
            TransactionType transactionType,
            BigDecimal amount,
            BigDecimal balanceAfter
    ) {

        PaperTransactionLog log = new PaperTransactionLog();
        log.setAccount(account);
        log.setCrypto(crypto);
        log.setTransactionType(transactionType);
        log.setAmount(amount);
        log.setBalanceAfter(balanceAfter);
        log.setCreatedAt(LocalDateTime.now());

        transactionRepo.save(log);
    }

    @Override
    public List<PaperTransactionLog> getTransactionsByUser(Long userId) {
        return transactionRepo.findByAccount_User_UserId(userId);
    }

    @Override
    public List<PaperTransactionLog> getTransactionsByAccount(Long accountId) {
        return transactionRepo.findByAccount_AccountId(accountId);
    }
}
