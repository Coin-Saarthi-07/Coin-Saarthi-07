package com.coinsaarthi.ai.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;


/**
 * Request DTO for explaining crypto price movement.
 *
 * Example use case:
 * - "Why did BTC cross $70,000?"
 */
public class PriceExplanationRequest {

    /**
     * Crypto asset symbol (e.g., BTC, ETH).
     */
    @NotBlank(message = "Symbol must not be empty")
    private String symbol;

    /**
     * Price point to explain (crossed, dropped to, etc).
     */
    @NotNull(message = "Price must not be null")
    private Double price;

    public PriceExplanationRequest() {
    }

    public PriceExplanationRequest(String symbol, Double price) {
        this.symbol = symbol;
        this.price = price;
    }

    public String getSymbol() {
        return symbol;
    }

    public Double getPrice() {
        return price;
    }

    public void setSymbol(String symbol) {
        this.symbol = symbol;
    }

    public void setPrice(Double price) {
        this.price = price;
    }
}
