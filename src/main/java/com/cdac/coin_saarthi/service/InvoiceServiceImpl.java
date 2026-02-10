package com.cdac.coin_saarthi.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.cdac.coin_saarthi.dto.InvoiceDTO;
import com.cdac.coin_saarthi.exception.ResourceNotFoundException;
import com.cdac.coin_saarthi.model.Invoice;
import com.cdac.coin_saarthi.repository.InvoiceRepository;

@Service
public class InvoiceServiceImpl implements InvoiceService {

	private final InvoiceRepository invoiceRepository;

	public InvoiceServiceImpl(InvoiceRepository invoiceRepository) {
		this.invoiceRepository = invoiceRepository;
	}

	// Create Invoice
	public Invoice createInvoice(Invoice invoice) {
		return invoiceRepository.save(invoice);
	}

	// Get All Invoices
	public List<Invoice> getAllInvoices() {
		return invoiceRepository.findAll();
	}

//    // Get Invoice By ID
//    public Invoice getInvoiceById(Long id){
//        return invoiceRepository.findById(id)
//                .orElseThrow(() -> new ResourceNotFoundException("Invoice Not Found"));
//    }
//    
//    public Invoice getInvoiceByUserId(Long userId){
//        Invoice invoice= invoiceRepository.findByUser_UserId(userId);
//        if(invoice==null) {
//        	throw new ResourceNotFoundException("Invoice Not Found og given user id");
//        }
//        return invoice;
//    }
	public InvoiceDTO getInvoiceById(Long id) {

		Invoice invoice = invoiceRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Invoice Not Found"));

		return mapToDTO(invoice);
	}

	public InvoiceDTO getInvoiceByPaymentId(Long paymentId) {

		Invoice invoice = invoiceRepository.findByPayment_PaymentId(paymentId);

		if (invoice == null) {
			throw new ResourceNotFoundException("Invoice Not Found for given user id");
		}

		return mapToDTO(invoice);
	}

	@Override
	public InvoiceDTO getInvoiceBySubscriptionPlanId(Long planId) {

		Invoice invoice = invoiceRepository.findByUserSubscription_SubscriptionPlan_PlanId(planId);

		if (invoice == null) {
			throw new ResourceNotFoundException("Invoice not found for subscription plan id: " + planId);
		}

		InvoiceDTO dto = new InvoiceDTO();
		dto.setInvoiceId(invoice.getInvoiceId());
		dto.setAmount(invoice.getAmount());
		dto.setCreatedAt(invoice.getCreatedAt());
		dto.setPaymentStatus(invoice.getInvoicePaymentStatus().name());

		dto.setUserId(invoice.getUser().getUserId());
		dto.setPaymentId(invoice.getPayment().getPaymentId());
		dto.setUserSubscriptionId(invoice.getUserSubscription().getUserSubscriptionId());

		return dto;
	}

	private InvoiceDTO mapToDTO(Invoice invoice) {
		InvoiceDTO dto = new InvoiceDTO();

		dto.setInvoiceId(invoice.getInvoiceId());
		dto.setAmount(invoice.getAmount());
		dto.setCreatedAt(invoice.getCreatedAt());
		dto.setPaymentStatus(invoice.getInvoicePaymentStatus().name());

		dto.setPaymentId(invoice.getPayment().getPaymentId());
		dto.setUserId(invoice.getUser().getUserId());
		dto.setUserSubscriptionId(invoice.getUserSubscription().getUserSubscriptionId());

		dto.setPlanId(invoice.getUserSubscription().getSubscriptionPlan().getPlanId());
		dto.setPlanName(invoice.getUserSubscription().getSubscriptionPlan().getPlanName());
		dto.setPlanDuration(invoice.getUserSubscription().getSubscriptionPlan().getDuration());

		return dto;
	}

}
