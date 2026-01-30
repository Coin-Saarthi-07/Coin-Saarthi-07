package com.cdac.coin_saarthi.service;

import java.math.BigDecimal;
import java.util.List;

import com.cdac.coin_saarthi.enums.OrderStatus;
import com.cdac.coin_saarthi.enums.OrderType;
import com.cdac.coin_saarthi.model.CryptoCurrency;
import com.cdac.coin_saarthi.model.PaperTradeOrder;
import com.cdac.coin_saarthi.model.PaperTradingAccount;

public interface PaperTradeOrderService {

	PaperTradeOrder createOrder(PaperTradingAccount account, CryptoCurrency crypto, OrderType orderType,
			BigDecimal quantity, BigDecimal price, OrderStatus status);

	List<PaperTradeOrder> getOrdersByUser(Long userId);

	List<PaperTradeOrder> getOrdersByAccount(Long accountId);
}
