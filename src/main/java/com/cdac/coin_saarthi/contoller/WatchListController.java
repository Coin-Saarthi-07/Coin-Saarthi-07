package com.cdac.coin_saarthi.contoller;

import com.cdac.coin_saarthi.dto.CreateWatchListDto;
import com.cdac.coin_saarthi.service.WatchListService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/crypto/watchlist")
public class WatchListController {
    private final WatchListService watchListService;

    public WatchListController(WatchListService watchListService) {
        this.watchListService = watchListService;
    }

    @GetMapping
    public ResponseEntity<?> getAll() {
        return ResponseEntity.ok(watchListService.getAll());
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getByUser(@PathVariable Long userId) {
        return ResponseEntity.ok(watchListService.getByUserId(userId));
    }

    @PostMapping
    public ResponseEntity<?> add(@Valid @RequestBody CreateWatchListDto dto) {
        boolean created = watchListService.create(dto);
        if (!created)
            return ResponseEntity.badRequest().body("Already exists in watchlist");
        return ResponseEntity.ok("Added to watchlist");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        boolean deleted = watchListService.delete(id);
        if (!deleted)
            return ResponseEntity.notFound().build();
        return ResponseEntity.ok("Removed from watchlist");
    }
}
