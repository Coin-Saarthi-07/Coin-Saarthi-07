package com.cdac.coin_saarthi.dto;

import lombok.Data;

@Data
public class HoldingDTO {
    private String cryptoName;
    private double quantity;
    private double avgBuyPrice;
    private double currentPrice;
    private double profitLoss;
}
