package com.cdac.coin_saarthi.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cdac.coin_saarthi.model.PaperTradeOrder;
import com.cdac.coin_saarthi.repository.PaperTradeOrderRepository;

import jakarta.annotation.security.PermitAll;

@RestController
@RequestMapping("/api/paper/orders")
@PreAuthorize("hasAnyAuthority('ADMIN','SUBSCRIBER')")
public class PaperTradeOrderController {

    private final PaperTradeOrderRepository orderRepo;

    public PaperTradeOrderController(PaperTradeOrderRepository orderRepo) {
        this.orderRepo = orderRepo;
    }

    // 1️⃣ Orders by USER
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<PaperTradeOrder>> getOrdersByUser(
            @PathVariable Long userId) {

        return ResponseEntity.ok(
                orderRepo.findByAccount_User_UserId(userId)
        );
    }

    // 2️⃣ Orders by ACCOUNT
    @GetMapping("/account/{accountId}")
    public ResponseEntity<List<PaperTradeOrder>> getOrdersByAccount(
            @PathVariable Long accountId) {

        return ResponseEntity.ok(
                orderRepo.findByAccount_AccountId(accountId)
        );
    }
}
