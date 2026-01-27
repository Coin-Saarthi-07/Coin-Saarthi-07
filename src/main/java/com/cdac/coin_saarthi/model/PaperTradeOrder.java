package com.cdac.coin_saarthi.model;

import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "paper_trade_order")
@Data
public class PaperTradeOrder {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long orderId;

    @ManyToOne
    @JoinColumn(name = "account_id")
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
