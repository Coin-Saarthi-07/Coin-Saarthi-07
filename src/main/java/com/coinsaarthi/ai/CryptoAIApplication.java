package com.coinsaarthi.ai;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Entry point for the Crypto AI Chatbot microservice.
 *
 * Responsibility:
 * - Bootstraps Spring Boot
 * - Scans crypto AI components only
 *
 * This service is designed to be stateless and
 * consumed by the Crypto Alert Monolith via REST.
 */
@SpringBootApplication(scanBasePackages = "com.coinsaarthi.ai")
public class CryptoAIApplication {

    public static void main(String[] args) {
        SpringApplication.run(CryptoAIApplication.class, args);
    }
}
