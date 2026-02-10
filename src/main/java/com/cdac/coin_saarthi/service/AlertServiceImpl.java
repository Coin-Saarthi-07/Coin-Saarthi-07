package com.cdac.coin_saarthi.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.cdac.coin_saarthi.authutil.SecurityUtil;
import com.cdac.coin_saarthi.dto.AlertRequestDTO;
import com.cdac.coin_saarthi.dto.UpdateAlertDTO;
import com.cdac.coin_saarthi.exception.AccessDeniedCustomException;
import com.cdac.coin_saarthi.exception.ResourceNotFoundException;
import com.cdac.coin_saarthi.model.Alert;
import com.cdac.coin_saarthi.model.AlertEnums;
import com.cdac.coin_saarthi.model.CryptoCurrency;
import com.cdac.coin_saarthi.model.User;
import com.cdac.coin_saarthi.repository.AlertRepository;
import com.cdac.coin_saarthi.repository.CryptoCurrencyRepository;
import com.cdac.coin_saarthi.repository.UserRepository;

@Service
public class AlertServiceImpl implements AlertService {

	private final AlertRepository alertRepository;
	private final UserRepository userRepository;
	private final CryptoCurrencyRepository cryptoCurrencyRepository;
	private final SecurityUtil securityUtil;

	public AlertServiceImpl(AlertRepository alertRepository,UserRepository userRepository,CryptoCurrencyRepository cryptoCurrencyRepository,SecurityUtil securityUtil) {
		this.alertRepository = alertRepository;
		this.cryptoCurrencyRepository=cryptoCurrencyRepository;
		this.userRepository=userRepository;
		this.securityUtil=securityUtil;
	}

	@Override
	public Alert createAlert(AlertRequestDTO request) {

		User user = userRepository.findByUserId(request.getUserId());
		if (user == null) {
			throw new ResourceNotFoundException("User not found of given id");
		}
		
		User currentUser = securityUtil.getCurrentUser();
		if((!currentUser.getUserId().equals(user.getUserId()))) {
			throw new AccessDeniedCustomException("User can't set alert for another user");
		}

		CryptoCurrency crypto = cryptoCurrencyRepository.findByCryptoId(request.getCryptoId());
		if (crypto == null) {
			throw new ResourceNotFoundException("Crypto not found of given id");
		}

		Alert alert = new Alert();
		alert.setUser(user);
		alert.setCryptoCurrency(crypto);
		alert.setDuration(request.getDuration());
		alert.setTargetPrice(request.getTargetPrice());
		alert.setCondition(request.getAlert_condition());
		alert.setType(request.getType());
		alert.setStatus(AlertEnums.AlertStatus.Active);

		return alertRepository.save(alert);
	}

	@Override
	public List<Alert> getAllAlerts() {
		return alertRepository.findAll();
	}

	@Override
	public void deleteAlert(Long alertId) {
		alertRepository.deleteById(alertId);
	}

	@Override
	public Alert getById(Long id) {
		return alertRepository.findById(id).orElseThrow(() -> new RuntimeException("Alert not found"));
	}

	@Override
	public Alert updateAlert(Long id, UpdateAlertDTO dto) {

		Alert alert = getById(id);

		alert.setTargetPrice(dto.getTargetPrice());
		alert.setCondition(dto.getCondition());
		alert.setStatus(dto.getStatus());
		alert.setType(dto.getType());

		return alertRepository.save(alert);
	}
}