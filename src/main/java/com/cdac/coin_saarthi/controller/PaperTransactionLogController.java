package com.cdac.coin_saarthi.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cdac.coin_saarthi.model.PaperTransactionLog;
import com.cdac.coin_saarthi.repository.PaperTransactionLogRepository;

import jakarta.annotation.security.PermitAll;

@RestController
@RequestMapping("/api/paper/transactions")
@PreAuthorize("hasAnyAuthority('ADMIN','SUBSCRIBER')")
public class PaperTransactionLogController {

    private final PaperTransactionLogRepository transactionRepo;

    public PaperTransactionLogController(PaperTransactionLogRepository transactionRepo) {
        this.transactionRepo = transactionRepo;
    }

    // 1️⃣ Transactions by USER
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<PaperTransactionLog>> getTransactionsByUser(
            @PathVariable Long userId) {

        return ResponseEntity.ok(
                transactionRepo.findByAccount_User_UserId(userId));
    }

    // 2️⃣ Transactions by ACCOUNT
    @GetMapping("/account/{accountId}")
    public ResponseEntity<List<PaperTransactionLog>> getTransactionsByAccount(
            @PathVariable Long accountId) {

        return ResponseEntity.ok(
                transactionRepo.findByAccount_AccountId(accountId));
    }
}
