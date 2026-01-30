package com.cdac.coin_saarthi.service;

import java.util.List;

import com.cdac.coin_saarthi.dto.HoldingDTO;
import com.cdac.coin_saarthi.dto.PortfolioSummaryDTO;

public interface PortfolioService {
	List<HoldingDTO> getHoldings(Long accountId);
	
	PortfolioSummaryDTO getSummary(Long accountId);

}


