package com.cdac.coin_saarthi.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "alert_logs")
@Getter
@Setter
public class AlertLog {

    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "AlertLogId")
    private Long alertLogId;

    
    @Column(name = "AlertId", nullable = false)
    private Long alertId;

    // ---------- RELATION ----------
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "AlertId", insertable = false, updatable = false)
    private Alert alert;

    // ---------- DATA ----------
    @Column(name = "TriggeredPrice", precision = 65, scale = 30, nullable = false)
    private BigDecimal triggeredPrice;

    @Column(name = "TriggeredTime", nullable = false)
    private LocalDateTime triggeredTime = LocalDateTime.now();
}

