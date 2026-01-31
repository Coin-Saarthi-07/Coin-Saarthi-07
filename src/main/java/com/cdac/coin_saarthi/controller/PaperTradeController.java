package com.cdac.coin_saarthi.controller;

import java.math.BigDecimal;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cdac.coin_saarthi.dto.SellRequestDTO;
import com.cdac.coin_saarthi.service.PaperTradeService;

import jakarta.annotation.security.PermitAll;

@RestController
@RequestMapping("/paper/trade")
@PermitAll
public class PaperTradeController {

	private final PaperTradeService service;

	public PaperTradeController(PaperTradeService service) {
		this.service = service;
	}

	// buy crypto
	@PostMapping("/buy")
	public ResponseEntity<?> buy(@RequestParam Long userId, @RequestParam Long cryptoId,
			@RequestParam BigDecimal quantity) {
		service.buyCrypto(userId, cryptoId, quantity);
		return ResponseEntity.ok("Buy order executed");
	}

	// sell crypto
	@PostMapping("/sell")
	public ResponseEntity<String> sellCrypto(@RequestBody SellRequestDTO dto) {

		service.sellCrypto(dto.getUserId(), dto.getCryptoId(), dto.getQuantity());

		return ResponseEntity.ok("Crypto sold successfully");
	}
}
