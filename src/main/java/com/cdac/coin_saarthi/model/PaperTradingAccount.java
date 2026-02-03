package com.cdac.coin_saarthi.model;


import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "paper_trading_account")
@Data
public class PaperTradingAccount {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long accountId;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    @lombok.ToString.Exclude
    private User user;

    @Column(nullable = false)
    private BigDecimal virtualBalance;

    private LocalDateTime createdAt;
    private LocalDateTime lastUpdated;
    
    @JsonIgnore
    @OneToMany(mappedBy = "account")
    @lombok.ToString.Exclude
    private List<PaperTradeOrder> orders;

    @JsonIgnore
    @OneToMany(mappedBy = "account")
    @lombok.ToString.Exclude
    private List<PaperTransactionLog> transactions;
    
    @OneToMany(mappedBy = "paperTradingAccount")
    @JsonIgnore
    @lombok.ToString.Exclude
    private List<Portfolio> portfolios;


}
