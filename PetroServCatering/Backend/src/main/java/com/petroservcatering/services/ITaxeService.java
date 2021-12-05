package com.petroservcatering.services;

import java.util.List;
import com.petroservcatering.model.Taxe;

public interface ITaxeService {	
	
	public Taxe  addTaxe(Taxe taxe) ;
	public void deleteTaxe(long id);
	public long updateTaxe(Taxe t , long id );
	public List<Taxe> getAllTaxes();
	public Taxe getTaxeById(long id);

}
