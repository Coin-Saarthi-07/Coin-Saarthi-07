package com.coinsaarthi.ai.service;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.stereotype.Service;

import com.coinsaarthi.ai.prompts.CryptoChatPrompt;

/**
 * Service responsible for handling general crypto AI chat.
 *
 * Stateless by design.
 */
@Service
public class CryptoChatService {

    private final ChatClient chatClient;

    public CryptoChatService(ChatClient.Builder chatClientBuilder) {
        this.chatClient = chatClientBuilder.build();
    }

    /**
     * Handles free-form crypto-related chat queries.
     *
     * @param message user question
     * @return AI-generated response
     */
    public String chat(String message) {
        return chatClient.prompt()
                .system(CryptoChatPrompt.SYSTEM_PROMPT)
                .user(user -> user.text(CryptoChatPrompt.USER_PROMPT)
                        .param("message", message))
                .call()
                .content();
    }
}
