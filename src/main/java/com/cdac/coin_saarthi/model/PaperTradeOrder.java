package com.cdac.coin_saarthi.model;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import com.cdac.coin_saarthi.enums.OrderStatus;
import com.cdac.coin_saarthi.enums.OrderType;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "paper_trade_order")
@Data
public class PaperTradeOrder {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long orderId;

    @ManyToOne
    @JoinColumn(name = "account_id")
    @lombok.ToString.Exclude
    private PaperTradingAccount account;

    @ManyToOne
    @JoinColumn(name = "crypto_id")
    private CryptoCurrency crypto;

    @Enumerated(EnumType.STRING)
    private OrderType orderType;

    private BigDecimal quantity;
    private BigDecimal priceAtOrder;

    @Enumerated(EnumType.STRING)
    private OrderStatus status;

    private LocalDateTime createdAt;
}
