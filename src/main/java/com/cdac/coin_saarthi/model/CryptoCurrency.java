package com.cdac.coin_saarthi.model;

import java.time.LocalDateTime;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "crypto_currency")
public class CryptoCurrency {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "crypto_id")
	private Long cryptoId;

	@Column(nullable = false)
	@Size(max = 100, message = "coinGeckoId must be at least 100 characters")
	private String coinGeckoId;

	@Column(nullable = false, unique = true)
	@Size(min = 2, max = 50, message = "Currency name must between 2-50 characters")
	@Pattern(regexp = "^[A-Za-z ]+$", message = "Currency name must contain letters only")
	private String currencyName;

	@Column(nullable = false)
	private Double currencyPrice;

	@Column(nullable = false, unique = true)
	@Size(min = 2, max = 10, message = "Currency symbol must between 2-10 characters")
	@Pattern(regexp = "^[A-Z]+$", message = "Currency symbol must be in capital letters only")
	private String currencySymbol;

	@NotNull
	private LocalDateTime lastUpdated;

	@OneToMany(mappedBy = "cryptoCurrency", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<PriceHistory> priceHistories;

	@OneToMany(mappedBy = "cryptoCurrency", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<Alert> alerts;

	@OneToMany(mappedBy = "cryptoCurrency", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<WatchList> watchLists;

	@OneToMany(mappedBy = "cryptoCurrency", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<Portfolio> portfolios;
}
