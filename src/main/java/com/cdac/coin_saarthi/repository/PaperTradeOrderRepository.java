package com.cdac.coin_saarthi.repository;

import com.cdac.coin_saarthi.model.PaperTradeOrder;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PaperTradeOrderRepository extends JpaRepository<PaperTradeOrder, Long> {

    List<PaperTradeOrder> findByAccount_AccountId(Long accountId);

}
