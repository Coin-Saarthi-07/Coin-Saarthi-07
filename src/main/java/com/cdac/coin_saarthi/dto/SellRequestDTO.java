package com.cdac.coin_saarthi.dto;

import java.math.BigDecimal;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SellRequestDTO {

    private Long userId;
    private Long cryptoId;
    private BigDecimal quantity;
}
