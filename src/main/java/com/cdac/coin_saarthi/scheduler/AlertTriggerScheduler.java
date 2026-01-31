
package com.cdac.coin_saarthi.scheduler;

import com.cdac.coin_saarthi.model.CryptoCurrency;
import com.cdac.coin_saarthi.repository.CryptoCurrencyRepository;
import com.cdac.coin_saarthi.service.AlertTriggerService;
import com.cdac.coin_saarthi.service.CryptoPriceService;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.List;

@Component
@EnableScheduling
public class AlertTriggerScheduler {

	private final CryptoPriceService cryptoPriceService;
	private final AlertTriggerService alertTriggerService;
	private final CryptoCurrencyRepository cryptoRepo;

	public AlertTriggerScheduler(CryptoPriceService cryptoPriceService, AlertTriggerService alertTriggerService,
			CryptoCurrencyRepository cryptoRepo) {
		this.cryptoPriceService = cryptoPriceService;
		this.alertTriggerService = alertTriggerService;
		this.cryptoRepo = cryptoRepo;
	}

	/**
	 * Runs every 30 seconds: 1. Refresh prices from CoinGecko 2. Read DB prices 3.
	 * Evaluate alerts
	 */
	@Scheduled(fixedDelay = 30_000)
	public void triggerAlerts() {

		// 1️. Update prices
		cryptoPriceService.refreshPrices();

		// 2️. Read latest prices from DB
		List<CryptoCurrency> cryptos = cryptoRepo.findAll();

		// 3.Trigger alerts
		for (CryptoCurrency crypto : cryptos) {

			if (crypto.getCurrencyPrice() == null) {
				continue;
			}

			alertTriggerService.evaluateAlerts(crypto.getCryptoId(), BigDecimal.valueOf(crypto.getCurrencyPrice()));
		}
	}
}

