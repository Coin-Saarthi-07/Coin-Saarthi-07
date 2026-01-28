package com.cdac.coin_saarthi.controller;

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

    //get holdings by account id
    @GetMapping("/holdings/{accountId}")
    public List<HoldingDTO> getHoldings(@PathVariable Long accountId) {
        return portfolioService.getHoldings(accountId);
    }

    //get summary from account id
    @GetMapping("/summary/{accountId}")
    public PortfolioSummaryDTO getSummary(@PathVariable Long accountId) {
        return portfolioService.getSummary(accountId);
    }
}