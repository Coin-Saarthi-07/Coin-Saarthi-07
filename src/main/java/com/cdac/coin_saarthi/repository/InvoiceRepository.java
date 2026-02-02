package com.cdac.coin_saarthi.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cdac.coin_saarthi.model.Invoice;
import com.cdac.coin_saarthi.model.Payment;

public interface InvoiceRepository extends JpaRepository<Invoice, Long> {
	boolean existsByPayment(Payment payment);
	Invoice findByPayment_PaymentId(Long userId);
	Invoice findByUserSubscription_SubscriptionPlan_PlanId(Long planId);

}
