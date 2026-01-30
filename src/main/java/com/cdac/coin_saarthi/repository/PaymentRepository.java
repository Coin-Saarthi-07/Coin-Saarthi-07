package com.cdac.coin_saarthi.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cdac.coin_saarthi.model.Payment;

public interface PaymentRepository extends JpaRepository<Payment, Long> {

	Optional<Payment> findByRazorpayOrderId(String razorpayOrderId);

	List<Payment> findByUser_UserId(Long userId);
}
