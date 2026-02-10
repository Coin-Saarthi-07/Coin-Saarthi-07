package com.cdac.coin_saarthi.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class CreateWatchListDto {
    @NotNull
    private Long userId;

    @NotNull
    private Long cryptoId;
}
