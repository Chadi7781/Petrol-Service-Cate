package com.petroservcatering.services;

import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.petroservcatering.model.Taxe;
import com.petroservcatering.repository.TaxeRepository;



@Service
public class TaxServiceImpl implements ITaxeService {
	
	
	
	@Autowired
	private TaxeRepository taxeRepository;

	@Override
	public Taxe addTaxe(Taxe taxe) {
		return taxeRepository.save(taxe);

	}

	public void deleteTaxe(long id) {		
	 taxeRepository.deleteById(id);;	
	}

	@Override
	public long updateTaxe(Taxe taxeDetail, long taxeid) {		
		Taxe taxe = taxeRepository.getOne(taxeid);
		taxe.setTaux(taxeDetail.getTaux());
		taxe.setType(taxeDetail.getType());
		taxe.setSens(taxeDetail.getSens());
		taxe.setDateDebut(taxeDetail.getDateDebut());
		taxe.setDateFin(taxeDetail.getDateFin());
		final Taxe updatedTaxe = taxeRepository.save(taxe);
		
		return updatedTaxe.getId();
	}
		
	

	//creating getAll method that retrieve all events from database
	@Override
	public List<Taxe> getAllTaxes() {
		
		List<Taxe>taxes = new ArrayList<Taxe>();
		taxeRepository.findAll().forEach(t ->taxes.add(t));
		return taxes;
	}
	//creating getByid method that retrieve event detail from database

	public Taxe getTaxeById(long id) {
		Taxe t = taxeRepository.getOne(id);
		if(t == null) return null;
		
			
		return t ;  

	}
	




}
