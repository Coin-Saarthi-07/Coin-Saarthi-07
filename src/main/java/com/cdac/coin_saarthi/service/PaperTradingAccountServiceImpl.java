package com.cdac.coin_saarthi.service;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import org.springframework.stereotype.Service;

import com.cdac.coin_saarthi.dto.AccountResponseDTO;
import com.cdac.coin_saarthi.exception.ResourceNotFoundException;
import com.cdac.coin_saarthi.model.PaperTradingAccount;
import com.cdac.coin_saarthi.model.User;
import com.cdac.coin_saarthi.repository.PaperTradingAccountRepository;
import com.cdac.coin_saarthi.repository.UserRepository;

@Service
public class PaperTradingAccountServiceImpl implements PaperTradingAccountService {

	private final PaperTradingAccountRepository accountRepository;
	private final UserRepository userRepository;

	public PaperTradingAccountServiceImpl(PaperTradingAccountRepository accountRepository,
			UserRepository userRepository) {
		this.accountRepository = accountRepository;
		this.userRepository = userRepository;
	}

	@Override
	public AccountResponseDTO createAccount(Long userId) {

		if (accountRepository.existsByUser_UserId(userId)) {
			throw new ResourceNotFoundException("Paper trading account already exists for this user");
		}

		User user = userRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User not found"));

		PaperTradingAccount account = new PaperTradingAccount();
		account.setUser(user);
		account.setVirtualBalance(new BigDecimal("100000"));
		account.setCreatedAt(LocalDateTime.now());
		account.setLastUpdated(LocalDateTime.now());

		PaperTradingAccount saved = accountRepository.save(account);

		AccountResponseDTO dto = new AccountResponseDTO();
		dto.setAccountId(saved.getAccountId());
		dto.setVirtualBalance(saved.getVirtualBalance());
		dto.setCreatedAt(saved.getCreatedAt());
		dto.setLastUpdated(saved.getLastUpdated());

		return dto;
	}

	@Override
	public PaperTradingAccount getAccountByUserId(Long userId) {
		return accountRepository.findByUser_UserId(userId)
				.orElseThrow(() -> new ResourceNotFoundException("Paper trading account not found"));
	}

	@Override
	public void resetAccount(Long userId) {
		PaperTradingAccount account = getAccountByUserId(userId);
		account.setVirtualBalance(new BigDecimal("100000"));
		account.setLastUpdated(LocalDateTime.now());
		PaperTradingAccount acc = accountRepository.save(account);
		if (acc == null) {
			throw new ResourceNotFoundException("Paper trading account not found");
		}
	}
}
