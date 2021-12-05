
	package com.petroservcatering.repository;



	import org.springframework.data.jpa.repository.JpaRepository;
	import org.springframework.stereotype.Repository;

import com.petroservcatering.model.LigneCommande;

	@Repository
	public interface LigneCommandeRepository extends JpaRepository<LigneCommande, Long>{

	}
