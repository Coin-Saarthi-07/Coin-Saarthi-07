
package com.cdac.coin_saarthi.service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.cdac.coin_saarthi.exception.ResourceNotFoundException;
import com.cdac.coin_saarthi.model.Alert;
import com.cdac.coin_saarthi.model.AlertEnums.AlertStatus;
import com.cdac.coin_saarthi.model.AlertEnums.ConditionType;
import com.cdac.coin_saarthi.model.AlertLog;
import com.cdac.coin_saarthi.model.CryptoCurrency;
import com.cdac.coin_saarthi.model.Notification;
import com.cdac.coin_saarthi.model.User;
import com.cdac.coin_saarthi.model.NotificationEnums.NotificationMedium;
import com.cdac.coin_saarthi.model.NotificationEnums.NotificationStatus;
import com.cdac.coin_saarthi.repository.AlertLogRepository;
import com.cdac.coin_saarthi.repository.AlertRepository;
import com.cdac.coin_saarthi.repository.CryptoCurrencyRepository;
import com.cdac.coin_saarthi.repository.NotificationRepository;

import jakarta.transaction.Transactional;

@Service
public class AlertTriggerService {

	private final AlertRepository alertRepository;
	private final AlertLogRepository alertLogRepository;
	private final NotificationRepository notificationRepository;
	private final CryptoCurrencyRepository cryptoCurrencyRepository;

	public AlertTriggerService(AlertRepository alertRepository, AlertLogRepository alertLogRepository,
			NotificationRepository notificationRepository, CryptoCurrencyRepository cryptoCurrencyRepository) {
		this.alertRepository = alertRepository;
		this.alertLogRepository = alertLogRepository;
		this.notificationRepository = notificationRepository;
		this.cryptoCurrencyRepository = cryptoCurrencyRepository;
	}

	/**
	 * Evaluates all ACTIVE alerts for a given crypto and price. This method is
	 * intentionally pure (no API calls).
	 */
	@Transactional
	public void evaluateAlerts(Long cryptoId, BigDecimal currentPrice) {

		List<Alert> activeAlerts = alertRepository.findByStatus(AlertStatus.Active);

		for (Alert alert : activeAlerts) {

			if (!alert.getCryptoCurrency().getCryptoId().equals(cryptoId)) {
				continue;
			}

			boolean triggered = (alert.getCondition() == ConditionType.Buy
					&& currentPrice.compareTo(alert.getTargetPrice()) <= 0)
					|| (alert.getCondition() == ConditionType.Sell
							&& currentPrice.compareTo(alert.getTargetPrice()) >= 0);

			if (!triggered) {
				continue;
			}
			CryptoCurrency crypto = cryptoCurrencyRepository.findById(cryptoId)
					.orElseThrow(() -> new ResourceNotFoundException("Crypto not found: " + cryptoId));

			// 1️. Mark alert as triggered
			alert.setStatus(AlertStatus.Triggered);
			alertRepository.save(alert);

			// 2️. Create alert log
			AlertLog log = new AlertLog();
			log.setAlert(alert);
			log.setTriggeredPrice(currentPrice);
			log.setTriggeredTime(LocalDateTime.now());
			alertLogRepository.save(log);

			// 3️. Create notifications (APP, EMAIL, SMS)
			createNotification(alert, NotificationMedium.APP, currentPrice);
			createNotification(alert, NotificationMedium.EMAIL, currentPrice);
			createNotification(alert, NotificationMedium.SMS, currentPrice);
		}
	}

	private void createNotification(Alert alert, NotificationMedium medium, BigDecimal price) {
		
		User user = alert.getUser();

        if (user == null || user.getUserId() == null) {
            throw new ResourceNotFoundException("Alert has no valid user");
        }
		CryptoCurrency crypto = cryptoCurrencyRepository.findById(alert.getCryptoCurrency().getCryptoId()).orElseThrow(
				() -> new ResourceNotFoundException("Crypto not found: " + alert.getCryptoCurrency().getCryptoId()));

		Notification notification = new Notification();
		notification.setUser(user);
		notification.setAlert(alert);
		notification.setMedium(medium);
		notification.setStatus(NotificationStatus.Pending);

		String message;

		switch (medium) {

		case SMS -> message = String.format("Alert triggered for cryptoId %d at price %s. Check Coin Saarthi app.",
				alert.getCryptoCurrency().getCryptoId(), price.toPlainString());

		case EMAIL ->
			// Professional, detailed email
			message = String.format("""
					Hello,

					Your crypto price alert has been triggered.

					Asset: %s (%s)
					Alert Type: %s
					Target Price: %s
					Current Price: %s
					Triggered At: %s

					Regards,
					Coin Saarthi Team
					""", crypto.getCurrencyName(), crypto.getCurrencySymbol(), alert.getCondition().name(),
					alert.getTargetPrice(), price, LocalDateTime.now());

		case APP ->
			// App notification (medium length)
			message = String.format("%s (%s) price alert triggered at %s", crypto.getCurrencyName(),
					crypto.getCurrencySymbol(), price);

		default -> message = "Crypto alert triggered.";
		}

		notification.setMessage(message);
		notification.setSentAt(LocalDateTime.now());

		notificationRepository.save(notification);
		System.out.println("Saved " + medium + " notification for user " + user.getUserId());
	}


}

