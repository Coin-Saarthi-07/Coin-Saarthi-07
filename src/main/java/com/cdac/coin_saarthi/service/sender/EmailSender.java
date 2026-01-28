package com.cdac.coin_saarthi.service.sender;
import jakarta.mail.internet.MimeMessage; 
import org.springframework.mail.javamail.JavaMailSender; 
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

//import com.sendgrid.*;
//import com.sendgrid.helpers.mail.Mail;
//import com.sendgrid.helpers.mail.objects.Content;
//import com.sendgrid.helpers.mail.objects.Email;
//
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.stereotype.Service;
//
//import java.io.IOException;
//
//@Service
//public class EmailSender {
//
//    @Value("${sendgrid.api.key}")
//    private String apiKey;
//
//    @Value("${sendgrid.from.email}")
//    private String fromEmail;
//
//    public void send(String to, String subject, String body) {
//
//        Email from = new Email(fromEmail);
//        Email toEmail = new Email(to);
//        Content content = new Content("text/plain", body);
//        Mail mail = new Mail(from, subject, toEmail, content);
//
//        SendGrid sg = new SendGrid(apiKey);
//        Request request = new Request();
//
//        try {
//            request.setMethod(Method.POST);
//            request.setEndpoint("mail/send");
//            request.setBody(mail.build());
//
//            Response response = sg.api(request);
//
//            if (response.getStatusCode() >= 400) {
//                throw new RuntimeException(
//                        "SendGrid failed: " + response.getBody()
//                );
//            }
//
//            System.out.println("✅ Email delivered to " + to);
//
//        } catch (Exception e) {
//            throw new RuntimeException("Email failed", e);
//        }
//    }
//}


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
