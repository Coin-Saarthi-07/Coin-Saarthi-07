package com.cdac.coin_saarthi.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cdac.coin_saarthi.model.Invoice;
import com.cdac.coin_saarthi.service.InvoiceService;

@RestController
@RequestMapping("/crypto/admin/invoices")
@PreAuthorize("hasAnyAuthority('SUBSCRIBER')")
public class InvoiceController {

    private final InvoiceService invoiceService;

    public InvoiceController(InvoiceService invoiceService) {
        this.invoiceService = invoiceService;
    }

    //Create Invoice
    @PostMapping
    public ResponseEntity<String> createInvoice(@RequestBody Invoice invoice) {
        invoiceService.createInvoice(invoice);
        return ResponseEntity.ok("Invoice created successfully");
    }

    //Get All Invoices
    @GetMapping
    public ResponseEntity<List<Invoice>> getAllInvoices() {
        return ResponseEntity.ok(invoiceService.getAllInvoices());
    }

    //Get Invoice By ID
    @GetMapping("/{id}")
    public ResponseEntity<Invoice> getInvoiceById(@PathVariable Long id) {
        return ResponseEntity.ok(invoiceService.getInvoiceById(id));
    }
}

