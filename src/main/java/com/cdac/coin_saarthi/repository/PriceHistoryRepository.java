package com.cdac.coin_saarthi.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cdac.coin_saarthi.model.PriceHistory;

public interface PriceHistoryRepository extends JpaRepository<PriceHistory, Long>{
	List<PriceHistory> findByCryptoCurrency_CryptoIdOrderByRecordedTimeAsc(Long cryptoId);

}
