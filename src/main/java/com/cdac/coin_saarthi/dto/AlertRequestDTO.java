package com.cdac.coin_saarthi.dto;

import com.cdac.coin_saarthi.model.AlertEnums.AlertType;
import com.cdac.coin_saarthi.model.AlertEnums.ConditionType;
import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class AlertRequestDTO {

    @NotNull(message = "UserId is required")
    private Long userId;

    @NotNull(message = "CryptoId is required")
    private Long cryptoId;

    @NotNull(message = "Duration is required")
    @Min(value = 1, message = "Duration must be at least 1")
    private Integer duration;

    @NotNull(message = "TargetPrice is required")
    @DecimalMin(value = "0.0", inclusive = false, message = "TargetPrice must be greater than 0")
    private BigDecimal targetPrice;

    @NotNull(message = "Condition is required")
    private ConditionType alert_condition;

    @NotNull(message = "Alert type is required")
    private AlertType type;
}
