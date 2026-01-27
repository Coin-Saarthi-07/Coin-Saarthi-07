package com.cdac.coin_saarthi.service;

import java.math.BigDecimal;

public interface PaperTradeService {

    void buyCrypto(Long userId, Long cryptoId, BigDecimal quantity);

    void sellCrypto(Long userId, Long cryptoId, BigDecimal quantity);
}
