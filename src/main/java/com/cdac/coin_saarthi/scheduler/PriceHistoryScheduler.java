package com.cdac.coin_saarthi.scheduler;

import com.cdac.coin_saarthi.model.CryptoCurrency;
import com.cdac.coin_saarthi.model.PriceHistory;
import com.cdac.coin_saarthi.repository.CryptoCurrencyRepository;
import com.cdac.coin_saarthi.repository.PriceHistoryRepository;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;

@Component
public class PriceHistoryScheduler {

    private final CryptoCurrencyRepository cryptoRepo;
    private final PriceHistoryRepository priceHistoryRepo;

    public PriceHistoryScheduler(CryptoCurrencyRepository cryptoRepo,
                                 PriceHistoryRepository priceHistoryRepo) {
        this.cryptoRepo = cryptoRepo;
        this.priceHistoryRepo = priceHistoryRepo;
    }

    /**
     * Runs every 1 minute.
     * Stores snapshot of current prices into price_history table.
     */
    @Scheduled(fixedRate = 60_000)
    public void capturePriceHistory() {

        List<CryptoCurrency> cryptos = cryptoRepo.findAll();

        if (cryptos.isEmpty()) return;

        for (CryptoCurrency crypto : cryptos) {

            PriceHistory history = new PriceHistory();
            history.setCryptoCurrency(crypto);
            history.setPrice(crypto.getCurrencyPrice());
            history.setRecordedTime(LocalDateTime.now());

            priceHistoryRepo.save(history);
        }
    }
}
