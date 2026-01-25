package com.cdac.coin_saarthi.model;


import com.cdac.coin_saarthi.enums.Role;
import com.cdac.coin_saarthi.enums.Status;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.Data;

import java.time.LocalDate;

@Entity
@Table(name = "users")
@Data

public class User {

//    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
//    private List<Alert> alerts;
//
//    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
//    private List<WatchList> watchlists;
//
//    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
//    private List<UserSubscription> subscriptions;
//
//    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
//    private List<Payment> payments;



    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    @NotBlank
    @Size(min = 6, max = 50)
    @Pattern(
            regexp = "^(?=.*[A-Z])[A-Za-z0-9_@]+$",
            message = "Username must contain at least one capital letter and may include letters, numbers, _ ,@ only."
    )
    private String userName;

    @NotBlank
    @Email
    @Size(max = 100)
    @Pattern(
            regexp = "^[a-zA-Z][a-zA-Z0-9]*@[a-zA-Z0-9]+\\.[a-zA-Z]{2,}$",
            message = "Email must start with a letter and may contain numbers"
    )
    @Column(unique = true)
    private String email;

    @NotBlank
    @Size(min = 8, max = 255)
    @Pattern(
            regexp = "^(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]+$",
            message = "Must contain at least one capital letter, one number, and one special character."
    )
    private String password;

    @NotBlank
    @Pattern(
            regexp = "^[6-9]\\d{9}$",
            message = "Enter valid 10 digit Indian mobile number"
    )
    @Column(length = 10, unique = true)
    private String phoneNo;

    @NotNull
    @Past

    private LocalDate dob;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Status status;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)// 1 = Active
    private Role role;   // 0 = User



    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPhoneNo() {
        return phoneNo;
    }

    public void setPhoneNo(String phoneNo) {
        this.phoneNo = phoneNo;
    }

    public LocalDate getDob() {
        return dob;
    }

    public void setDob(LocalDate dob) {
        this.dob = dob;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

}
