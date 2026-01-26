package com.cdac.coin_saarthi.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.cdac.coin_saarthi.model.Invoice;
import com.cdac.coin_saarthi.repository.InvoiceRepository;

@Service
public class InvoiceServiceImpl implements InvoiceService{

    private final InvoiceRepository invoiceRepository;

    public InvoiceServiceImpl(InvoiceRepository invoiceRepository) {
        this.invoiceRepository = invoiceRepository;
    }

    //Create Invoice
    public Invoice createInvoice(Invoice invoice){
        return invoiceRepository.save(invoice);
    }

    //Get All Invoices
    public List<Invoice> getAllInvoices(){
        return invoiceRepository.findAll();
    }

    // Get Invoice By ID
    public Invoice getInvoiceById(Long id){
        return invoiceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Invoice Not Found"));
    }
}
