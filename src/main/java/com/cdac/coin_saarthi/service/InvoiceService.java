package com.cdac.coin_saarthi.service;

import java.util.List;

import com.cdac.coin_saarthi.dto.InvoiceDTO;
import com.cdac.coin_saarthi.model.Invoice;

public interface InvoiceService {
	//create
	Invoice createInvoice(Invoice invoice);
	//get all
	List<Invoice> getAllInvoices();
	//get by id
	InvoiceDTO getInvoiceById(Long id);
	//get by payment
	InvoiceDTO getInvoiceByPaymentId(Long id);
	//get by user_subs
	InvoiceDTO getInvoiceBySubscriptionPlanId(Long planId);
	
}
