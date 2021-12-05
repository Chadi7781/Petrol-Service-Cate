package com.petroservcatering.services;

import java.util.List;
import java.util.Optional;

import com.petroservcatering.model.LigneDevis;

public interface ILigneDevisService {
	public LigneDevis  addLigneDevis(LigneDevis ligneDevis);
	public Optional<LigneDevis> getLigneDevisById(Long id);
	//public int updateLigneDevis(LigneDevis ligneDevis , int id );
	public List<LigneDevis> getAllLigneDevis();
	public void deleteLigneDevis(long id);

}
