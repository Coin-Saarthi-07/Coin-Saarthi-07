package com.cdac.coin_saarthi.service;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import org.springframework.stereotype.Service;

import com.cdac.coin_saarthi.enums.OrderStatus;
import com.cdac.coin_saarthi.enums.OrderType;
import com.cdac.coin_saarthi.enums.TransactionType;
import com.cdac.coin_saarthi.exception.ResourceNotFoundException;
import com.cdac.coin_saarthi.model.CryptoCurrency;
import com.cdac.coin_saarthi.model.PaperTradeOrder;
import com.cdac.coin_saarthi.model.PaperTradingAccount;
import com.cdac.coin_saarthi.model.PaperTransactionLog;
import com.cdac.coin_saarthi.model.Portfolio;
import com.cdac.coin_saarthi.repository.CryptoCurrencyRepository;
import com.cdac.coin_saarthi.repository.PaperTradeOrderRepository;
import com.cdac.coin_saarthi.repository.PaperTradingAccountRepository;
import com.cdac.coin_saarthi.repository.PaperTransactionLogRepository;
import com.cdac.coin_saarthi.repository.PortfolioRepository;

import jakarta.transaction.Transactional;

@Service
public class PaperTradeServiceImpl implements PaperTradeService {

	private final PaperTradingAccountRepository accountRepo;
	private final CryptoCurrencyRepository cryptoRepo;
	private final PortfolioRepository portfolioRepo;
	private final PaperTradeOrderRepository orderRepo;
	private final PaperTransactionLogRepository transactionLogRepo;

	public PaperTradeServiceImpl(PaperTradingAccountRepository accountRepo, CryptoCurrencyRepository cryptoRepo,
			PortfolioRepository portfolioRepo, PaperTradeOrderRepository orderRepo,
			PaperTransactionLogRepository transactionLogRepo) {
		this.accountRepo = accountRepo;
		this.cryptoRepo = cryptoRepo;
		this.portfolioRepo = portfolioRepo;
		this.orderRepo = orderRepo;
		this.transactionLogRepo = transactionLogRepo;
	}

	// buy crypto
	
	@Transactional
	@Override
	public void buyCrypto(Long userId, Long cryptoId, BigDecimal quantity) {

	    PaperTradingAccount account = accountRepo.findByUser_UserId(userId)
	        .orElseThrow(() -> new ResourceNotFoundException("Account not found"));

	    CryptoCurrency crypto = cryptoRepo.findById(cryptoId)
	        .orElseThrow(() -> new ResourceNotFoundException("Crypto not found"));

	    BigDecimal price = BigDecimal.valueOf(crypto.getCurrencyPrice());
	    BigDecimal cost = price.multiply(quantity);

	    if (account.getVirtualBalance().compareTo(cost) < 0) {
	        throw new IllegalArgumentException("Insufficient virtual balance");
	    }

	    // 1. Deduct balance
	    account.setVirtualBalance(account.getVirtualBalance().subtract(cost));
	    account.setLastUpdated(LocalDateTime.now());

	    // 2. Load portfolio (LOCKED by transaction)
	    Portfolio portfolio = portfolioRepo
	        .findByPaperTradingAccount_AccountIdAndCryptoCurrency_CryptoId(
	            account.getAccountId(), cryptoId
	        )
	        .orElse(null);

	    if (portfolio == null) {
	        portfolio = new Portfolio();
	        portfolio.setPaperTradingAccount(account);
	        portfolio.setCryptoCurrency(crypto);
	        portfolio.setTotalQuantity(quantity.doubleValue());
	        portfolio.setAverageBuyPrice(price.doubleValue());
	    } else {
	        BigDecimal oldQty = BigDecimal.valueOf(portfolio.getTotalQuantity());
	        BigDecimal oldAvg = BigDecimal.valueOf(portfolio.getAverageBuyPrice());

	        BigDecimal newQty = oldQty.add(quantity);
	        BigDecimal newAvg = oldAvg.multiply(oldQty)
	            .add(price.multiply(quantity))
	            .divide(newQty, 8, BigDecimal.ROUND_HALF_UP);

	        portfolio.setTotalQuantity(newQty.doubleValue());
	        portfolio.setAverageBuyPrice(newAvg.doubleValue());
	    }

	    portfolio.setLastUpdated(LocalDateTime.now());

	    accountRepo.save(account);
	    portfolioRepo.save(portfolio);

	    // 3. Order
	    PaperTradeOrder order = new PaperTradeOrder();
	    order.setAccount(account);
	    order.setCrypto(crypto);
	    order.setOrderType(OrderType.BUY);
	    order.setQuantity(quantity);
	    order.setPriceAtOrder(price);
	    order.setStatus(OrderStatus.EXECUTED);
	    order.setCreatedAt(LocalDateTime.now());
	    orderRepo.save(order);

	    // 4. Transaction log
	    PaperTransactionLog log = new PaperTransactionLog();
	    log.setAccount(account);
	    log.setCrypto(crypto);
	    log.setTransactionType(TransactionType.BUY);
	    log.setAmount(cost);
	    log.setBalanceAfter(account.getVirtualBalance());
	    log.setCreatedAt(LocalDateTime.now());
	    transactionLogRepo.save(log);
	}

	// sell crypto
	@Override
	public void sellCrypto(Long userId, Long cryptoId, BigDecimal quantity) {

		PaperTradingAccount account = accountRepo.findByUser_UserId(userId)
				.orElseThrow(() -> new ResourceNotFoundException("Account not found"));

		Portfolio portfolio = portfolioRepo
				.findByPaperTradingAccount_AccountIdAndCryptoCurrency_CryptoId(account.getAccountId(), cryptoId)
				.orElseThrow(() -> new ResourceNotFoundException("Crypto not in portfolio"));

		BigDecimal currentQty = BigDecimal.valueOf(portfolio.getTotalQuantity());

		if (currentQty.compareTo(quantity) < 0) {
			throw new IllegalArgumentException("Insufficient quantity");
		}

		CryptoCurrency crypto = cryptoRepo.findById(cryptoId)
				.orElseThrow(() -> new ResourceNotFoundException("Crypto not found"));

		BigDecimal price = BigDecimal.valueOf(crypto.getCurrencyPrice());
		BigDecimal amount = price.multiply(quantity);

		// 1️. Credit balance
		account.setVirtualBalance(account.getVirtualBalance().add(amount));
		account.setLastUpdated(LocalDateTime.now());
		accountRepo.save(account);

		// 2️. Update portfolio
		BigDecimal remainingQty = currentQty.subtract(quantity);

		if (remainingQty.compareTo(BigDecimal.ZERO) == 0) {
			portfolioRepo.delete(portfolio);
		} else {
			portfolio.setTotalQuantity(remainingQty.doubleValue());
			portfolio.setLastUpdated(LocalDateTime.now());
			portfolioRepo.save(portfolio);
		}

		// 3️. Create ORDER
		PaperTradeOrder order = new PaperTradeOrder();
		order.setAccount(account);
		order.setCrypto(crypto);
		order.setOrderType(OrderType.SELL);
		order.setQuantity(quantity);
		order.setPriceAtOrder(price);
		order.setStatus(OrderStatus.EXECUTED);
		order.setCreatedAt(LocalDateTime.now());
		orderRepo.save(order);

		// 4️. Create TRANSACTION LOG
		PaperTransactionLog log = new PaperTransactionLog();
		log.setAccount(account);
		log.setCrypto(crypto);
		log.setTransactionType(TransactionType.SELL);
		log.setAmount(amount);
		log.setBalanceAfter(account.getVirtualBalance());
		log.setCreatedAt(LocalDateTime.now());
		transactionLogRepo.save(log);
	}

}
