package com.petroservcatering.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.petroservcatering.model.StockMagasin;

@Repository
public interface StockMagasinRepository extends JpaRepository<StockMagasin, Long> {

}
