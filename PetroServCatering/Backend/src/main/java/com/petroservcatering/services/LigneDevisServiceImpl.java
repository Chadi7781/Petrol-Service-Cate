package com.petroservcatering.services;

import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.petroservcatering.model.LigneDevis;
import com.petroservcatering.repository.LigneDevisRepository;

@Service
public class LigneDevisServiceImpl implements ILigneDevisService {

	private final Logger log = LoggerFactory.getLogger(ILigneDevisService.class);

	@Autowired
	private LigneDevisRepository ligneDevisRepository;

	@Override
	public LigneDevis addLigneDevis(LigneDevis ligneDevis) {
		log.debug("Request to save LigneDevis : {}", ligneDevis);
		return ligneDevisRepository.save(ligneDevis);
	}

	@Override
	public Optional<LigneDevis> getLigneDevisById(Long id) {
		log.debug("Request to get LigneDevis : {}", id);
		Optional<LigneDevis> ligneDevis = ligneDevisRepository.findById(id);
		return ligneDevis;
	}

	@Override
	public List<LigneDevis> getAllLigneDevis() {
		log.debug("Request to get all LigneDevis");
		return ligneDevisRepository.findAll();
	}

	@Override
	public void deleteLigneDevis(long id) {
		log.debug("Request to delete Devis : {}", id);
		ligneDevisRepository.deleteById(id);

	}

}
