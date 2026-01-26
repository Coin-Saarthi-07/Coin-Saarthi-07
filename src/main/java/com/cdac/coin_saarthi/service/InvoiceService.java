package com.cdac.coin_saarthi.service;

import java.util.List;

import com.cdac.coin_saarthi.model.Invoice;

public interface InvoiceService {
	//create
	Invoice createInvoice(Invoice invoice);
	//get all
	List<Invoice> getAllInvoices();
	//get by id
	Invoice getInvoiceById(Long id);
}
