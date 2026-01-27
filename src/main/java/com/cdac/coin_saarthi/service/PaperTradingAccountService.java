package com.cdac.coin_saarthi.service;

import com.cdac.coin_saarthi.model.PaperTradingAccount;

public interface PaperTradingAccountService {

    PaperTradingAccount createAccount(Long userId);

    PaperTradingAccount getAccountByUserId(Long userId);

    void resetAccount(Long userId);
}
