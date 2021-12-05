package com.petroservcatering.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.petroservcatering.model.BonReception;

@Repository
public interface BonReceptionRepository  extends JpaRepository<BonReception, Long> {
}
