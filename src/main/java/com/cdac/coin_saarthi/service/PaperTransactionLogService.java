package com.cdac.coin_saarthi.service;

import java.math.BigDecimal;
import java.util.List;

import com.cdac.coin_saarthi.enums.TransactionType;
import com.cdac.coin_saarthi.model.CryptoCurrency;
import com.cdac.coin_saarthi.model.PaperTradingAccount;
import com.cdac.coin_saarthi.model.PaperTransactionLog;

public interface PaperTransactionLogService {

	void logTransaction(PaperTradingAccount account, CryptoCurrency crypto, TransactionType transactionType,
			BigDecimal amount, BigDecimal balanceAfter);

	List<PaperTransactionLog> getTransactionsByUser(Long userId);

	List<PaperTransactionLog> getTransactionsByAccount(Long accountId);
}
