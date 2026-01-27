package com.cdac.coin_saarthi.service;

import com.cdac.coin_saarthi.model.CryptoCurrency;
import com.cdac.coin_saarthi.model.PaperTradingAccount;
import com.cdac.coin_saarthi.repository.CryptoCurrencyRepository;
import com.cdac.coin_saarthi.repository.PaperTradeOrderRepository;
import com.cdac.coin_saarthi.repository.PaperTradingAccountRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Service
public class PaperTradeServiceImpl implements PaperTradeService{

    private final PaperTradingAccountRepository accountRepo;
    private final CryptoCurrencyRepository cryptoRepo;
//    private final PaperPortfolioRepository portfolioRepo;
    private final PaperTradeOrderRepository orderRepo;

    public PaperTradeServiceImpl(
            PaperTradingAccountRepository accountRepo,
            CryptoCurrencyRepository cryptoRepo,
//            PaperPortfolioRepository portfolioRepo,
            PaperTradeOrderRepository orderRepo) {
        this.accountRepo = accountRepo;
        this.cryptoRepo = cryptoRepo;
//        this.portfolioRepo = portfolioRepo;
        this.orderRepo = orderRepo;
    }

//    @Override
    public void buyCrypto(Long userId, Long cryptoId, BigDecimal quantity) {

        PaperTradingAccount account = accountRepo.findByUser_UserId(userId)
                .orElseThrow(() -> new RuntimeException("Account not found"));

        CryptoCurrency crypto = cryptoRepo.findById(cryptoId)
                .orElseThrow(() -> new RuntimeException("Crypto not found"));

        BigDecimal price =
                BigDecimal.valueOf(crypto.getCurrencyPrice());

        BigDecimal cost = price.multiply(quantity);

        if (account.getVirtualBalance().compareTo(cost) < 0) {
            throw new RuntimeException("Insufficient virtual balance");
        }
        account.setVirtualBalance(account.getVirtualBalance().subtract(cost));
        account.setLastUpdated(LocalDateTime.now());
        accountRepo.save(account);

//        PaperPortfolio portfolio = portfolioRepo
//                .findByAccount_AccountIdAndCrypto_CryptoId(
//                        account.getAccountId(), cryptoId)
//                .orElse(new PaperPortfolio());
//        portfolio.setAccount(account);
//        portfolio.setCrypto(crypto);
//        portfolio.setTotalQuantity(
//                portfolio.getTotalQuantity() == null
//                        ? quantity
//                        : portfolio.getTotalQuantity().add(quantity));
//        portfolio.setAverageBuyPrice(crypto.getCurrencyPrice());
//        portfolio.setLastUpdated(LocalDateTime.now());

//        portfolioRepo.save(portfolio);
    }

//    @Override
    public void sellCrypto(Long userId, Long cryptoId, BigDecimal quantity) {

        PaperTradingAccount account = accountRepo.findByUser_UserId(userId)
                .orElseThrow(() -> new RuntimeException("Account not found"));

//        PaperPortfolio portfolio = portfolioRepo
//                .findByAccount_AccountIdAndCrypto_CryptoId(
//                        account.getAccountId(), cryptoId)
//                .orElseThrow(() -> new RuntimeException("Crypto not in portfolio"));

//        if (portfolio.getTotalQuantity().compareTo(quantity) < 0) {
//            throw new RuntimeException("Insufficient quantity");
//        }

        CryptoCurrency crypto = cryptoRepo.findById(cryptoId).orElseThrow();
        BigDecimal amount =
                BigDecimal.valueOf(crypto.getCurrencyPrice())
                        .multiply(quantity);

        // Update balance
        account.setVirtualBalance(account.getVirtualBalance().add(amount));
        account.setLastUpdated(LocalDateTime.now());
        accountRepo.save(account);

        // Update portfolio
//        portfolio.setTotalQuantity(portfolio.getTotalQuantity().subtract(quantity));
//        portfolio.setLastUpdated(LocalDateTime.now());
//
//        portfolioRepo.save(portfolio);
    }

}
