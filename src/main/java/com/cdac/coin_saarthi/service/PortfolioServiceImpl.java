package com.cdac.coin_saarthi.service;

import com.cdac.coin_saarthi.model.Portfolio;
import com.cdac.coin_saarthi.dto.*;
import com.cdac.coin_saarthi.repository.PortfolioRepository;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.*;

@Service
public class PortfolioServiceImpl implements PortfolioService {

    
    private final PortfolioRepository portfolioRepo;

    
    private final MarketPriceService priceService;
    
    public PortfolioServiceImpl(MarketPriceService priceService , PortfolioRepository portfolioRepo) {
    	this.portfolioRepo = portfolioRepo;
    	this.priceService = priceService;
    }

    public List<HoldingDTO> getHoldings(Long accountId) {

        List<Portfolio> list = portfolioRepo.findByAccountId(accountId);
        List<HoldingDTO> result = new ArrayList<>();

        for (Portfolio p : list) {

            Long cryptoId = p.getCryptoCurrency().getCryptoId();
            double currentPrice = priceService.getPrice(cryptoId);

            HoldingDTO dto = new HoldingDTO();
            dto.setCryptoName(p.getCryptoCurrency().getCurrencySymbol());
            dto.setQuantity(p.getTotalQuantity());
            dto.setAvgBuyPrice(p.getAverageBuyPrice());
            dto.setCurrentPrice(currentPrice);
            dto.setProfitLoss((currentPrice - p.getAverageBuyPrice()) * p.getTotalQuantity());

            result.add(dto);
        }
        return result;
    }

    public PortfolioSummaryDTO getSummary(Long accountId) {

        List<Portfolio> list = portfolioRepo.findByAccountId(accountId);

        double invested = 0;
        double current = 0;

        for (Portfolio p : list) {
            double price = priceService.getPrice(p.getCryptoCurrency().getCryptoId());
            invested += p.getTotalQuantity() * p.getAverageBuyPrice();
            current += p.getTotalQuantity() * price;
        }

        PortfolioSummaryDTO dto = new PortfolioSummaryDTO();
        dto.setTotalInvestment(invested);
        dto.setCurrentValue(current);
        dto.setTotalProfitLoss(current - invested);

        return dto;
    }
}
