package com.cdac.coin_saarthi.contoller;

import com.cdac.coin_saarthi.model.Invoice;

import com.cdac.coin_saarthi.service.InvoiceService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/crypto/admin/invoices")
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

