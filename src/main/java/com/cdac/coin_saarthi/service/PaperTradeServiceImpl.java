package com.cdac.coin_saarthi.service;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import org.springframework.beans.factory.config.RuntimeBeanNameReference;
import org.springframework.stereotype.Service;

import com.cdac.coin_saarthi.model.CryptoCurrency;
import com.cdac.coin_saarthi.model.PaperTradingAccount;
import com.cdac.coin_saarthi.model.Portfolio;
import com.cdac.coin_saarthi.repository.CryptoCurrencyRepository;
import com.cdac.coin_saarthi.repository.PaperTradeOrderRepository;
import com.cdac.coin_saarthi.repository.PaperTradingAccountRepository;
import com.cdac.coin_saarthi.repository.PortfolioRepository;

@Service
public class PaperTradeServiceImpl implements PaperTradeService{

    private final PaperTradingAccountRepository accountRepo;
    private final CryptoCurrencyRepository cryptoRepo;
    private final PortfolioRepository portfolioRepo;
    private final PaperTradeOrderRepository orderRepo;

    public PaperTradeServiceImpl(
            PaperTradingAccountRepository accountRepo,
            CryptoCurrencyRepository cryptoRepo,
            PortfolioRepository portfolioRepo,
            PaperTradeOrderRepository orderRepo) {
        this.accountRepo = accountRepo;
        this.cryptoRepo = cryptoRepo;
        this.portfolioRepo = portfolioRepo;
        this.orderRepo = orderRepo;
    }

    //buy crypto
    @Override
    public void buyCrypto(Long userId, Long cryptoId, BigDecimal quantity) {

        PaperTradingAccount account = accountRepo.findByUser_UserId(userId)
                .orElseThrow(() -> new RuntimeException("Account not found"));

        CryptoCurrency crypto = cryptoRepo.findById(cryptoId)
                .orElseThrow(() -> new RuntimeException("Crypto not found"));
        
        BigDecimal price = BigDecimal.valueOf(crypto.getCurrencyPrice());
        BigDecimal cost = price.multiply(quantity);

        if (account.getVirtualBalance().compareTo(cost) < 0) {
            throw new RuntimeException("Insufficient virtual balance");
        }
        account.setVirtualBalance(account.getVirtualBalance().subtract(cost));
        account.setLastUpdated(LocalDateTime.now());
        accountRepo.save(account);

        Portfolio portfolio = portfolioRepo
                .findByPaperTradingAccount_AccountIdAndCryptoCurrency_CryptoId(account.getAccountId(), cryptoId)
                .orElseThrow(()-> new RuntimeException("Account not found!"));
        portfolio.setPaperTradingAccount(account);
        portfolio.setCryptoCurrency(crypto);
        Double qty = quantity.doubleValue();

        portfolio.setTotalQuantity(
            portfolio.getTotalQuantity() == null
                ? qty
                : portfolio.getTotalQuantity() + qty
        );

        portfolio.setAverageBuyPrice(crypto.getCurrencyPrice());
        portfolio.setLastUpdated(LocalDateTime.now());

        portfolioRepo.save(portfolio);
    }

    //sell crypto
    @Override
    public void sellCrypto(Long userId, Long cryptoId, BigDecimal quantity) {

        PaperTradingAccount account = accountRepo.findByUser_UserId(userId)
                .orElseThrow(() -> new RuntimeException("Account not found"));

        Portfolio portfolio = portfolioRepo
        	    .findByPaperTradingAccount_AccountIdAndCryptoCurrency_CryptoId(
        	        account.getAccountId(),
        	        cryptoId
        	    )
        	    .orElseThrow(() -> new RuntimeException("Crypto not in portfolio"));


        BigDecimal currentQty =
                portfolio.getTotalQuantity() == null
                        ? BigDecimal.ZERO
                        : BigDecimal.valueOf(portfolio.getTotalQuantity());

        if (currentQty.compareTo(quantity) < 0) {
            throw new RuntimeException("Insufficient quantity");
        }


        CryptoCurrency crypto = cryptoRepo.findById(cryptoId).orElseThrow();
        
        BigDecimal price = BigDecimal.valueOf(crypto.getCurrencyPrice());
        BigDecimal amount = price.multiply(quantity);

        // Update balance
        account.setVirtualBalance(account.getVirtualBalance().add(amount));
        account.setLastUpdated(LocalDateTime.now());
        accountRepo.save(account);

        // Update portfolio
        portfolio.setTotalQuantity(
        	    portfolio.getTotalQuantity() - quantity.doubleValue()
        	);

        portfolio.setLastUpdated(LocalDateTime.now());

        portfolioRepo.save(portfolio);
    }
}
