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
public class Notification {

    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "NotificationId")
    private Long notificationId;

   
    @Column(name = "UserId", nullable = false)
    private Long userId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "UserId", insertable = false, updatable = false)
    private User user;

    
    @Column(name = "AlertId", nullable = false)
    private Long alertId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "AlertId", insertable = false, updatable = false)
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
