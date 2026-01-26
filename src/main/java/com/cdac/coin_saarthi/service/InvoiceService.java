package com.cdac.coin_saarthi.service;

import com.cdac.coin_saarthi.model.Invoice;
import com.cdac.coin_saarthi.repository.InvoiceRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InvoiceService {

    private final InvoiceRepository invoiceRepository;

    public InvoiceService(InvoiceRepository invoiceRepository) {
        this.invoiceRepository = invoiceRepository;
    }

    //Create Invoice
    public void createInvoice(Invoice invoice) {
        invoiceRepository.save(invoice);
    }

    //Get All Invoices
    public List<Invoice> getAllInvoices() {
        return invoiceRepository.findAll();
    }

    // Get Invoice By ID
    public Invoice getInvoiceById(Long id) {
        return invoiceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Invoice Not Found"));
    }
}
