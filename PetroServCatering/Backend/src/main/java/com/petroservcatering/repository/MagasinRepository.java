package com.petroservcatering.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.petroservcatering.model.Magasin;

@Repository
public interface MagasinRepository extends JpaRepository<Magasin, Long> {

}


