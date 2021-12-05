package com.petroservcatering.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.petroservcatering.model.LigneDevis;

@Repository
public interface LigneDevisRepository extends JpaRepository<LigneDevis, Long> {

}
