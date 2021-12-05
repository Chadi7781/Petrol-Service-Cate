package com.petroservcatering.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.petroservcatering.model.Eetat;
import com.petroservcatering.model.Etat;


@Repository
public interface EtatRepository extends JpaRepository<Etat,Long> {
    Etat findByName(Eetat name);
}
