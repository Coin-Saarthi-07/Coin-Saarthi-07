package com.cdac.coin_saarthi.service.sender;

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class SmsSender {

    @Value("${twilio.account.sid:}")
    private String accountSid;

    @Value("${twilio.auth.token:}")
    private String authToken;

    @Value("${twilio.sms.from:}")
    private String fromNumber;

    private boolean enabled = false;

    @PostConstruct
    public void init() {
        try {
            if (!accountSid.isBlank() && !authToken.isBlank()) {
                Twilio.init(accountSid, authToken);
                enabled = true;
            }
        } catch (Exception ex) {
            enabled = false;
            System.err.println("❌ Twilio disabled: " + ex.getMessage());
        }
    }

    public boolean isEnabled() {
        return enabled;
    }

    public void send(String to, String message) {
        if (!enabled) {
            throw new IllegalStateException("SMS disabled");
        }

        Message.creator(
                new PhoneNumber(to),
                new PhoneNumber(fromNumber),
                message
        ).create();
    }
}
