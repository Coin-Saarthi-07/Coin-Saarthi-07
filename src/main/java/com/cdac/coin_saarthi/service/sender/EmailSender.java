package com.cdac.coin_saarthi.service.sender;
import jakarta.mail.internet.MimeMessage; 
import org.springframework.mail.javamail.JavaMailSender; 
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;


@Service
public class EmailSender {

    private final JavaMailSender mailSender;

    public EmailSender(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void send(String to, String subject, String body) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper =
                    new MimeMessageHelper(message, "UTF-8");

            helper.setFrom("hanuman.jadhav.cmaug25@gmail.com");
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(body, false);

            mailSender.send(message);

        } catch (Exception e) {
            throw new RuntimeException("Email failed", e);
        }
    }
}
