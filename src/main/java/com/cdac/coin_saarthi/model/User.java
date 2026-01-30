
package com.cdac.coin_saarthi.model;

import java.time.LocalDate;
import java.util.List;

import com.cdac.coin_saarthi.enums.UserRole;
import com.cdac.coin_saarthi.enums.UserStatus;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.AssertTrue;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "users")
@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long userId;

	@NotBlank
	@Size(min = 6, max = 50)
	@Pattern(regexp = "^(?=.*[A-Z])[A-Za-z0-9_@]+$", message = "Username must contain at least one capital letter and may include letters, numbers, _ ,@ only.")
	private String userName;

	@NotBlank
	@Email
	@Size(max = 100)
	@Email(message = "Invalid email format")
	@Column(unique = true)
	private String email;


	@NotBlank
	@JsonIgnore
	@Size(min = 8, max = 255)
	@Pattern(regexp = "^(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&]).+$", message = "Password Must contain at least one capital letter, one number, and one special character.")
	private String password;


	@NotBlank
	@Pattern(regexp = "^[6-9]\\d{9}$", message = "Enter valid 10 digit Indian mobile number")
	@Column(length = 10, unique = true)
	private String phoneNo;

	@NotNull
	@Past
	private LocalDate dob;

	@AssertTrue(message = "User must be at least 18 years old")
	public boolean isAdult() {
	    if (dob == null) return false;
	    return dob.plusYears(18).isBefore(LocalDate.now())
	            || dob.plusYears(18).isEqual(LocalDate.now());
	}	

	@Enumerated(EnumType.STRING)
	@Column(nullable = false)
	private UserStatus status = UserStatus.ACTIVE;

	@Enumerated(EnumType.STRING)
	@Column(nullable = false)
	private UserRole role = UserRole.USER;
	
	@JsonIgnore
	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<Alert> alerts;

	@JsonIgnore
	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<WatchList> watchlists;

	@JsonIgnore
	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<UserSubscription> subscriptions;

	@JsonIgnore
	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<Payment> payments;

}
