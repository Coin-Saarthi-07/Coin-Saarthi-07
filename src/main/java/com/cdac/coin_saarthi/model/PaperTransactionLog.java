package com.cdac.coin_saarthi.model;

import com.cdac.coin_saarthi.enums.TransactionType;
import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "paper_transaction_log")
public class PaperTransactionLog {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long transactionId;

    @ManyToOne
    @JoinColumn(name = "account_id")
    private PaperTradingAccount account;

    @ManyToOne
    @JoinColumn(name = "crypto_id")
    private CryptoCurrency crypto;

    @Enumerated(EnumType.STRING)
    private TransactionType transactionType;


    private BigDecimal amount;
    private BigDecimal balanceAfter;
    private LocalDateTime createdAt;

}
