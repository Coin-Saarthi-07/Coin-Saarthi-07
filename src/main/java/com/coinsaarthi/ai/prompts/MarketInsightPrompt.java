package com.coinsaarthi.ai.prompts;

/**
 * Prompt template for generating crypto market insights.
 *
 * Used to summarize market conditions for a given crypto asset
 * over a specific timeframe.
 */
public final class MarketInsightPrompt {

    private MarketInsightPrompt() {}

    /**
     * System-level instruction for the AI model.
     */
    public static final String SYSTEM_PROMPT = """
        You are a cryptocurrency market analyst assistant.
        Provide factual, neutral, and easy-to-understand market summaries.
        Do NOT give financial advice.
        Do NOT predict future prices.
        Base insights on general market behavior and publicly known factors.
        """;

    /**
     * User prompt template for market summary.
     */
    public static final String USER_PROMPT = """
        Provide a concise market summary for the following crypto asset:

        Symbol: {symbol}
        Timeframe: {timeframe}

        Focus on:
        - overall trend
        - notable market activity
        - general sentiment
        """;
}
