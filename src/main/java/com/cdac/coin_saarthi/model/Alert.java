package com.cdac.coin_saarthi.model;

import com.cdac.coin_saarthi.model.AlertEnums.AlertStatus;
import com.cdac.coin_saarthi.model.AlertEnums.AlertType;
import com.cdac.coin_saarthi.model.AlertEnums.ConditionType;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "alerts")
@Getter
@Setter
public class Alert {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "alert_id")
    private Long alertId;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "crypto_id", updatable = false,nullable=false)
    private CryptoCurrency cryptoCurrency;

    @Column(name = "duration", nullable = false)
    private Integer duration;

    @Column(name = "target_price", precision = 65, scale = 30, nullable = false)
    private BigDecimal targetPrice;

    @Enumerated(EnumType.STRING)
    @Column(name = "alert_condition", nullable = false)
    private ConditionType condition;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private AlertStatus status;

    @Enumerated(EnumType.STRING)
    @Column(name = "type", nullable = false)
    private AlertType type;

    @Column(name = "CreatedAt", nullable = false)
    private LocalDateTime createdAt;

    @PrePersist
    private void onCreate() {
        this.createdAt = LocalDateTime.now();
        this.status = AlertStatus.Active;
    }
}
