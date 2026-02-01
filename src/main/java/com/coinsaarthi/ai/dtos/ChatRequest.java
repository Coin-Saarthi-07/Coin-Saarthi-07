package com.coinsaarthi.ai.dtos;

import jakarta.validation.constraints.NotBlank;


/**
 * Request DTO for general AI chat.
 *
 * Used by the Crypto Alert Monolith to
 * ask free-form crypto-related questions.
 */
public class ChatRequest {

    /**
     * Optional identifier of the user.
     * Useful for logging and future personalization.
     */
    private String userId;

    /**
     * User's chat message.
     */
    @NotBlank(message = "Message must not be empty")
    private String message;

    public ChatRequest() {
    }

    public ChatRequest(String userId, String message) {
        this.userId = userId;
        this.message = message;
    }

    public String getUserId() {
        return userId;
    }

    public String getMessage() {
        return message;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
