package com.petroservcatering.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.petroservcatering.model.Famille;
import com.petroservcatering.model.SousFamille;

@Repository
public interface SousFamilleRepository extends JpaRepository<SousFamille, Long> {
	List<SousFamille> findAll();

}