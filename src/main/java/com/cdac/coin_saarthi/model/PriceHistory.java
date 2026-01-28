package com.cdac.coin_saarthi.model;

import java.time.LocalDate;
import java.time.LocalTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name="price_history")
public class PriceHistory{
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long priceHistoryId;
	
	@ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "crypto_id", nullable = false)
	private CryptoCurrency cryptoCurrency;
	
	@Column(nullable=false)
	private Double price;

	@Column(nullable=false)
	private LocalTime recordedTime;
}
