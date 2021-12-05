package com.petroservcatering.services;

import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.petroservcatering.model.Devis;
import com.petroservcatering.repository.DevisRepository;

@Service
public class DevisServiceImpl implements IDevisService {

	private final Logger log = LoggerFactory.getLogger(IDevisService.class);

	@Autowired
	private DevisRepository devisRepository;

	@Override
	public List<Devis> getAllDevis() {
		log.debug("Request to get all Devis");
		return devisRepository.findAll();
	}

	@Override
	public Devis addDevis(Devis devis) {
		log.debug("Request to save Devis : {}", devis);
		return devisRepository.save(devis);
	}

	@Override
	public Optional<Devis> getDevisById(Long id) {
		log.debug("Request to get Devis : {}", id);
		Optional<Devis> devis = devisRepository.findById(id);
		return devis;
	}

	@Override
	public void deleteDevis(long id) {
		log.debug("Request to delete Devis : {}", id);
		devisRepository.deleteById(id);
	}

}
