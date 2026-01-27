package com.cdac.coin_saarthi.contoller;

import com.cdac.coin_saarthi.dto.*; 
import com.cdac.coin_saarthi.service.PortfolioService;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;

@RestController
@RequestMapping("/api/portfolio")
public class PortfolioController {

    
    private final PortfolioService portfolioService;
    
    public PortfolioController(PortfolioService portfolioService) {
    	this.portfolioService= portfolioService;
    }

    @GetMapping("/holdings/{accountId}")
    public List<HoldingDTO> getHoldings(@PathVariable Long accountId) {
        return portfolioService.getHoldings(accountId);
    }

    @GetMapping("/summary/{accountId}")
    public PortfolioSummaryDTO getSummary(@PathVariable Long accountId) {
        return portfolioService.getSummary(accountId);
    }
}