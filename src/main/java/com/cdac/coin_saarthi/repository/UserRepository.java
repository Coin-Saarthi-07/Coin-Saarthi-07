package com.cdac.coin_saarthi.repository;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cdac.coin_saarthi.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
    boolean existsByUserNameAndUserIdNot(String userName, Long userId);
    Optional<User> findByUserName(String email);
    boolean existsByEmail(String email);
    boolean existsByUserName(String email);
    boolean existsByEmailAndUserIdNot(String email, Long userId);
}