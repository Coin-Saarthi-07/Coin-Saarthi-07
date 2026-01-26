package com.cdac.coin_saarthi.model;


import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.List;

@Entity
@Table(name = "subscription_plans")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SubscriptionPlan {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long planId;

    @NotBlank
    @Pattern(regexp = "^[A-Za-z ]+$", message = "Plan name must contain letters and spaces only")
    @Column(nullable = false)
    private String planName;

    @NotNull
    @DecimalMin(value = "0.0", message = "Plan price must be at least ₹0")
    @DecimalMax(value = "500.0", message = "Plan price must be less than ₹500")
    @Column(nullable = false)
    private BigDecimal planPrice;

    @NotNull
    @Min(value = 1)
    @Max(value = 365)
    @Column(nullable = false)
    private Long duration;

    @NotBlank
    @Size(min = 20, max = 100)
    @Column(nullable = false, length = 100)
    private String features;

    // Relationships
    @OneToMany(mappedBy = "subscriptionPlan", cascade = CascadeType.ALL)
    private List<UserSubscription> userSubscriptions;
}
