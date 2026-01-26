package com.cdac.coin_saarthi.controller;

import com.cdac.coin_saarthi.dto.CreateNotificationDTO;
import com.cdac.coin_saarthi.dto.UpdateNotificationDTO;
import com.cdac.coin_saarthi.model.Notification;
import com.cdac.coin_saarthi.service.NotificationService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notification")
public class NotificationController {

    private final NotificationService notificationService;

    public NotificationController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    // GET: /api/notification
    @GetMapping
    public List<Notification> getAll() {
        return notificationService.getAll();
    }

    // GET: /api/notification/{id}
    @GetMapping("/{id}")
    public Notification get(@PathVariable Long id) {
        return notificationService.getById(id);
    }

    // POST: /api/notification
    @PostMapping
    public Notification create(@Valid @RequestBody CreateNotificationDTO dto) {
        return notificationService.create(dto);
    }

    // PUT: /api/notification/{id}/status
    @PutMapping("/{id}/status")
    public Notification updateStatus(
            @PathVariable Long id,
            @Valid @RequestBody UpdateNotificationDTO dto
    ) {
        return notificationService.updateStatus(id, dto);
    }

    // DELETE: /api/notification/{id}
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        notificationService.delete(id);
    }
}
