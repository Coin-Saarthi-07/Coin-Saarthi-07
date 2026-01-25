package com.cdac.coin_saarthi.repository;

import com.cdac.coin_saarthi.model.Payment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PaymentRepository extends JpaRepository<Payment,Long> {
    List<Payment> findByUser_UserId(Long userId);
}
