package com.coinsaarthi.ai.dtos;

import jakarta.validation.constraints.NotBlank;

/**
 * Request DTO for generating a crypto market summary.
 *
 * Example use case:
 * - "Summarize today's BTC market"
 */
public class MarketSummaryRequest {

    /**
     * Crypto asset symbol (e.g., BTC, ETH).
     */
    @NotBlank(message = "Symbol must not be empty")
    private String symbol;

    /**
     * Optional timeframe for the summary (e.g., 24h, 7d).
     */
    private String timeframe;

    public MarketSummaryRequest() {
    }

    public MarketSummaryRequest(String symbol, String timeframe) {
        this.symbol = symbol;
        this.timeframe = timeframe;
    }

    public String getSymbol() {
        return symbol;
    }

    public String getTimeframe() {
        return timeframe;
    }

    public void setSymbol(String symbol) {
        this.symbol = symbol;
    }

    public void setTimeframe(String timeframe) {
        this.timeframe = timeframe;
    }
}
