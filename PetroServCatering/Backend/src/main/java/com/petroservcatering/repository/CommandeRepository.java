package com.petroservcatering.repository;



import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.petroservcatering.model.Commande;

import org.springframework.data.repository.query.Param;

import java.util.List;

@Repository
public interface CommandeRepository extends JpaRepository<Commande, Long>{

    List<Commande> findByFournisseur_Id(@Param("id") Long id);

}
