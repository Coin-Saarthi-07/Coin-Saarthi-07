package com.cdac.coin_saarthi.model;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import com.cdac.coin_saarthi.enums.TransactionType;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "paper_transaction_log")
public class PaperTransactionLog {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long transactionId;

    @ManyToOne
    @JoinColumn(name = "account_id")
    @lombok.ToString.Exclude
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
