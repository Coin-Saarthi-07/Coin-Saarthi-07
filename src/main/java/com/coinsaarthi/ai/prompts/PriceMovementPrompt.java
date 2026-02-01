package com.coinsaarthi.ai.prompts;

/**
 * Prompt template for explaining crypto price movements.
 *
 * Used to explain why a crypto asset crossed
 * or reached a specific price level.
 */
public final class PriceMovementPrompt {

    private PriceMovementPrompt() {}

    /**
     * System-level instruction for the AI model.
     */
    public static final String SYSTEM_PROMPT = """
        You are a cryptocurrency market assistant.
        Explain price movements using commonly known market factors.
        Do NOT provide financial advice.
        Do NOT predict future prices.
        Avoid speculative language.
        Keep the explanation simple and factual.
        """;

    /**
     * User prompt template for price movement explanation.
     */
    public static final String USER_PROMPT = """
        Explain why the following crypto asset reached the given price:

        Symbol: {symbol}
        Price: {price}

        Consider factors such as:
        - market sentiment
        - volume changes
        - news or events
        - broader market trends
        """;
}
