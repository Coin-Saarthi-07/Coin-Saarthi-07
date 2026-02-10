package com.cdac.coin_saarthi.service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.cdac.coin_saarthi.enums.OrderStatus;
import com.cdac.coin_saarthi.enums.OrderType;
import com.cdac.coin_saarthi.model.CryptoCurrency;
import com.cdac.coin_saarthi.model.PaperTradeOrder;
import com.cdac.coin_saarthi.model.PaperTradingAccount;
import com.cdac.coin_saarthi.repository.PaperTradeOrderRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class PaperTradeOrderServiceImpl implements PaperTradeOrderService {

	private final PaperTradeOrderRepository orderRepo;

	public PaperTradeOrderServiceImpl(PaperTradeOrderRepository orderRepo) {
		this.orderRepo = orderRepo;
	}

	@Override
	public PaperTradeOrder createOrder(PaperTradingAccount account, CryptoCurrency crypto, OrderType orderType,
			BigDecimal quantity, BigDecimal price, OrderStatus status) {

		PaperTradeOrder order = new PaperTradeOrder();
		order.setAccount(account);
		order.setCrypto(crypto);
		order.setOrderType(orderType);
		order.setQuantity(quantity);
		order.setPriceAtOrder(price);
		order.setStatus(status);
		order.setCreatedAt(LocalDateTime.now());

		return orderRepo.save(order);
	}

	@Override
	public List<PaperTradeOrder> getOrdersByUser(Long userId) {
		return orderRepo.findByAccount_User_UserId(userId);
	}

	@Override
	public List<PaperTradeOrder> getOrdersByAccount(Long accountId) {
		return orderRepo.findByAccount_AccountId(accountId);
	}
}
