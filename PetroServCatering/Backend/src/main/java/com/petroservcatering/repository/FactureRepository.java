package com.petroservcatering.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.petroservcatering.model.Facture;
import org.springframework.data.repository.query.Param;
import java.util.List;

@Repository
public interface FactureRepository extends JpaRepository<Facture, Long>{

    List<Facture> findByFournisseur_Id(@Param("id") Long id);

}
