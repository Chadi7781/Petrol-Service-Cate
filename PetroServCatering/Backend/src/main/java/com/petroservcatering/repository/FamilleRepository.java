package com.petroservcatering.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

import com.petroservcatering.model.Famille;
import com.petroservcatering.model.SousFamille;

@Repository
public interface FamilleRepository extends JpaRepository <Famille,Long> {
	List<Famille> findAll();
	


	@Query("SELECT sf FROM SousFamille sf   JOIN  sf.famille f join f.sousFamilles sf   WHERE f = :f ")
	List<SousFamille> findSousFamillesIdFamille(@Param("f") Famille f);


}



