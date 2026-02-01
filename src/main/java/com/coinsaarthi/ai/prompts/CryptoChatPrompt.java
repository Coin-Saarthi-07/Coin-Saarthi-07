package com.coinsaarthi.ai.prompts;

/**
 * Prompt template for general crypto AI chat.
 *
 * Used for answering user questions related to:
 * - cryptocurrency markets
 * - price movements
 * - basic crypto concepts
 *
 * This prompt is intentionally conversational and non-advisory.
 */
public final class CryptoChatPrompt {

    private CryptoChatPrompt() {}

    /**
     * System-level instruction for the AI model.
     */
    public static final String SYSTEM_PROMPT = """
        You are a knowledgeable cryptocurrency market assistant.
        Answer clearly, concisely, and in simple language.
        Do NOT provide financial advice.
        Do NOT make price predictions.
        Base responses on general market knowledge and public information.
        """;

    /**
     * User message template.
     */
    public static final String USER_PROMPT = """
        User question:
        {message}

        Respond in a helpful and easy-to-understand manner.
        """;
}
