package com.cdac.coin_saarthi.service;

import java.util.List;

import com.cdac.coin_saarthi.dto.PaymentDTO;
import com.cdac.coin_saarthi.model.Payment;

public interface PaymentService{
	Payment createPayment(PaymentDTO dto);
	List<Payment> getPaymentsByUser(Long userId);
}
