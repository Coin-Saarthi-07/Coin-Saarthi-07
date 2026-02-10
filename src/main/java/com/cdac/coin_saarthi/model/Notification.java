package com.cdac.coin_saarthi.model;

import com.cdac.coin_saarthi.model.NotificationEnums.NotificationMedium;
import com.cdac.coin_saarthi.model.NotificationEnums.NotificationStatus;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "notifications")
@Getter
@Setter
public class Notification{

    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "NotificationId")
    private Long notificationId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "UserId", updatable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "AlertId", updatable = false)
    private Alert alert;

    @Enumerated(EnumType.STRING)
    @Column(name = "Medium", nullable = false)
    private NotificationMedium medium = NotificationMedium.APP;

    @Enumerated(EnumType.STRING)
    @Column(name = "Status", nullable = false)
    private NotificationStatus status = NotificationStatus.Sent;
   
    @Column(name = "SentAt", nullable = false)
    private LocalDateTime sentAt = LocalDateTime.now();

    @Column(name = "Message", nullable = false)
    private String message;
}
