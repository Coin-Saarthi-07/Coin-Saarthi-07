package com.cdac.coin_saarthi.repository;
import com.cdac.coin_saarthi.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    boolean existsByUserNameAndUserIdNot(String userName, Long userId);

    boolean existsByEmailAndUserIdNot(String email, Long userId);
}
