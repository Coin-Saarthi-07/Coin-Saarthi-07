package com.cdac.coin_saarthi.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class WatchListResponseDto {

    private Long watchListId;
    private Long cryptoId;
    private String currencyName;
    private String symbol;
    private Double currentPrice;
    private LocalDateTime addedOn;
}
