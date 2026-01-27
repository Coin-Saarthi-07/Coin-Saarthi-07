package com.cdac.coin_saarthi.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "portfolio")
@Data
public class Portfolio {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long portfolioId;

    @
    @JoinColumn(name = "account_id" , nullable = false)
    private Long accountId;   

    @ManyToOne
    @JoinColumn(name = "crypto_id", nullable = false)
    private CryptoCurrency cryptoCurrency;

    @Column(nullable = false)
    private double totalQuantity;

    @Column(nullable = false)
    private double averageBuyPrice;

    @Column(nullable = false)
    private LocalDateTime lastUpdated = LocalDateTime.now();
}
