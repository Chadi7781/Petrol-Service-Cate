package com.petroservcatering.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.petroservcatering.model.Client;

@Repository
public interface ClientRepository extends JpaRepository<Client, Long> {
	List<Client> findAll();
}
