package com.cdac.coin_saarthi.model;

import com.cdac.coin_saarthi.model.AlertEnums.AlertStatus;
import com.cdac.coin_saarthi.model.AlertEnums.AlertType;
import com.cdac.coin_saarthi.model.AlertEnums.ConditionType;
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
    @Column(name = "AlertId")
    private Long alertId;

    @Column(name = "UserId", nullable = false)
    private Long userId;

    // ---------- FK COLUMN ----------
    @Column(name = "CryptoId", nullable = false)
    private Long cryptoId;

    // ---------- RELATION ----------
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "CryptoId", insertable = false, updatable = false)
    private CryptoCurrency cryptoCurrency;

    @Column(name = "Duration", nullable = false)
    private Integer duration;

    @Column(name = "TargetPrice", precision = 65, scale = 30, nullable = false)
    private BigDecimal targetPrice;

    @Enumerated(EnumType.STRING)
    @Column(name = "Alert_Condition", nullable = false)
    private ConditionType condition;

    @Enumerated(EnumType.STRING)
    @Column(name = "Status", nullable = false)
    private AlertStatus status;

    @Enumerated(EnumType.STRING)
    @Column(name = "Type", nullable = false)
    private AlertType type;

    @Column(name = "CreatedAt", nullable = false)
    private LocalDateTime createdAt;

    @PrePersist
    private void onCreate() {
        this.createdAt = LocalDateTime.now();
        this.status = AlertStatus.Active;
    }
}
