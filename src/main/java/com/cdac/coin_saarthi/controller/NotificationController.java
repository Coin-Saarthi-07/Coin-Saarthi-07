package com.cdac.coin_saarthi.controller;

import java.util.List;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cdac.coin_saarthi.dto.CreateNotificationDTO;
import com.cdac.coin_saarthi.dto.UpdateNotificationDTO;
import com.cdac.coin_saarthi.dto.NotificationResponseDTO;
import com.cdac.coin_saarthi.model.Notification;
import com.cdac.coin_saarthi.service.NotificationService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/notification")
@PreAuthorize("hasAnyAuthority('USER','SUBSCRIBER')")
public class NotificationController {

    private final NotificationService notificationService;

    public NotificationController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    // GET: /api/notification
    //Get all
    @GetMapping
    public List<Notification> getAll() {
        return notificationService.getAll();
    }

    // GET: /api/notification/{id}
    //get by id
    @GetMapping("/{id}")
    public Notification get(@PathVariable Long id) {
        return notificationService.getById(id);
    }

    // GET: /api/notification/user/{userId}
    // get notifications by user id
    @GetMapping("/user/{userId}")
    public List<NotificationResponseDTO> getByUser(@PathVariable Long userId) {
        return notificationService.getByUser(userId);
    }

    // POST: /api/notification
    //create notification
    @PostMapping
    public Notification create(@Valid @RequestBody CreateNotificationDTO dto) {
        return notificationService.create(dto);
    }

    // PUT: /api/notification/{id}/status
    // update notification status
    @PutMapping("/{id}/status")
    public Notification updateStatus(
            @PathVariable Long id,
            @Valid @RequestBody UpdateNotificationDTO dto
    ) {
        return notificationService.updateStatus(id, dto);
    }

    // DELETE: /api/notification/{id}
    //delete notification
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        notificationService.delete(id);
    }
}
