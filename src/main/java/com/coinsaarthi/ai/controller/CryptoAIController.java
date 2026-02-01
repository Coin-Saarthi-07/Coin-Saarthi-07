package com.coinsaarthi.ai.controller;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.coinsaarthi.ai.dtos.ChatRequest;
import com.coinsaarthi.ai.dtos.MarketSummaryRequest;
import com.coinsaarthi.ai.dtos.PriceExplanationRequest;
import com.coinsaarthi.ai.service.CryptoChatService;
import com.coinsaarthi.ai.service.MarketInsightService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/ai")
@RequiredArgsConstructor
public class CryptoAIController {

    private final CryptoChatService cryptoChatService;
    private final MarketInsightService marketInsightService;

    /**
     * General purpose crypto AI chat endpoint.
     * Used by the crypto alert monolith for user chat.
     */
    @PostMapping("/chat")
    public ResponseEntity<String> chat(
            @RequestBody @Valid ChatRequest request) {

        String response = cryptoChatService.chat(request.getMessage());
        return ResponseEntity.ok(response);
    }

    /**
     * Returns a summarized view of the current crypto market
     * for a given asset (BTC, ETH, etc).
     */
    @PostMapping("/market-summary")
    public ResponseEntity<String> marketSummary(
            @RequestBody @Valid MarketSummaryRequest request) {

        String summary = marketInsightService.generateMarketSummary(request.getSymbol());
        return ResponseEntity.ok(summary);
    }

    /**
     * Explains why a specific crypto asset moved in price.
     */
    @PostMapping("/price-explanation")
    public ResponseEntity<String> priceExplanation(
            @RequestBody @Valid PriceExplanationRequest request) {

        String explanation = marketInsightService.explainPriceMovement(
                request.getSymbol(),
                request.getPrice()
        );

        return ResponseEntity.ok(explanation);
    }
}
