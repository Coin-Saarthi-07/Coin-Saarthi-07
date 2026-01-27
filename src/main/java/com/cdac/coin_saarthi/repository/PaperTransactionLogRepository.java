package com.cdac.coin_saarthi.repository;

import com.cdac.coin_saarthi.model.PaperTransactionLog;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PaperTransactionLogRepository extends JpaRepository<PaperTransactionLog, Long> {

    List<PaperTransactionLog> findByAccount_AccountId(Long accountId);
}
