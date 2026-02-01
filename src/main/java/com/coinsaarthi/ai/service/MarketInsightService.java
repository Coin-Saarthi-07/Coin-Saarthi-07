package com.coinsaarthi.ai.service;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.stereotype.Service;

import com.coinsaarthi.ai.prompts.MarketInsightPrompt;
import com.coinsaarthi.ai.prompts.PriceMovementPrompt;

/**
 * Service responsible for generating crypto market insights
 * and explaining price movements.
 *
 * Stateless by design.
 */
@Service
public class MarketInsightService {

    private final ChatClient chatClient;

    public MarketInsightService(ChatClient.Builder builder) {
        this.chatClient = builder.build();
    }

    /**
     * Generates a concise market summary for a crypto asset.
     *
     * @param symbol crypto symbol (BTC, ETH, etc.)
     * @return AI-generated market summary
     */
    public String generateMarketSummary(String symbol) {
        return chatClient.prompt()
                .system(MarketInsightPrompt.SYSTEM_PROMPT)
                .user(user -> user.text(MarketInsightPrompt.USER_PROMPT)
                        .param("symbol", symbol)
                        .param("timeframe", "24h"))
                .call()
                .content();
    }

    /**
     * Explains why a crypto asset reached a specific price.
     *
     * @param symbol crypto symbol
     * @param price price point reached
     * @return AI-generated explanation
     */
    public String explainPriceMovement(String symbol, Double price) {
        return chatClient.prompt()
                .system(PriceMovementPrompt.SYSTEM_PROMPT)
                .user(user -> user.text(PriceMovementPrompt.USER_PROMPT)
                        .param("symbol", symbol)
                        .param("price", price))
                .call()
                .content();
    }
}
