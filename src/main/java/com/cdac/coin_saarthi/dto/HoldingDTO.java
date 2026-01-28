package com.cdac.coin_saarthi.dto;

import lombok.Data;

@Data
public class HoldingDTO {
    private String cryptoName;
    private Double quantity;
    private Double avgBuyPrice;
    private Double currentPrice;
    private Double profitLoss;
}
