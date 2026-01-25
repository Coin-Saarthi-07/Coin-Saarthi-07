package com.cdac.coin_saarthi.repository;

import com.cdac.coin_saarthi.model.WatchList;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WatchListRepository extends JpaRepository<WatchList,Long> {
    boolean existsByUser_UserIdAndCryptoCurrency_CryptoId(Long userId, Long cryptoId);

    List<WatchList> findByUser_UserId(Long userId);
}
