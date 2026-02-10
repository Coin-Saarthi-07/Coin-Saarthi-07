package com.cdac.coin_saarthi.dto;

import com.cdac.coin_saarthi.model.AlertEnums;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class UpdateAlertDTO {

    @NotNull
    private BigDecimal targetPrice;

    @NotNull
    private AlertEnums.ConditionType condition;

    @NotNull
    private AlertEnums.AlertStatus status;

    @NotNull
    private AlertEnums.AlertType type;
}
