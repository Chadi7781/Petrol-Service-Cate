package com.petroservcatering.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.petroservcatering.model.LigneFacture;

@Repository
public interface LigneFactureRepository extends JpaRepository<LigneFacture, Long> {
}
