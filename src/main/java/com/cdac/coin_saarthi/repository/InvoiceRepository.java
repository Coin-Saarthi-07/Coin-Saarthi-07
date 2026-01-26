package com.cdac.coin_saarthi.repository;

import com.cdac.coin_saarthi.model.Invoice;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InvoiceRepository extends JpaRepository<Invoice, Long> {
}
