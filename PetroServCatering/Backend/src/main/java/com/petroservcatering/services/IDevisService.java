package com.petroservcatering.services;

import java.util.List;
import java.util.Optional;

import com.petroservcatering.model.Devis;

public interface IDevisService{
	public Devis  addDevis(Devis devis);
	public Optional<Devis> getDevisById(Long id);
	public List<Devis> getAllDevis();
	public void deleteDevis(long id);
	
	
}
