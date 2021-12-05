package com.petroservcatering.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.petroservcatering.model.Taxe;
import com.petroservcatering.services.ITaxeService;

import io.swagger.annotations.Api;

@Api(value = "Swagger2DemoRestController", description = "REST APIs related to Taxe Entity!!!!")
@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/v1")
public class TaxeController {


	@Autowired
	ITaxeService taxeService;

	@PostMapping("/taxes")
	@ResponseBody
	public Taxe addTaxe(@RequestBody Taxe taxe) throws Exception {
		return taxeService.addTaxe(taxe);
	}

	@DeleteMapping("/taxes/{id}")
	public ResponseEntity<String>  deleteTaxe(@PathVariable("id") Long id) {
		 taxeService.deleteTaxe(id);
	    return new ResponseEntity<String>("Taxe deleted successfully",HttpStatus.OK);

	}

	@GetMapping("/taxes/{id}")
	public Taxe getTaxeById(@PathVariable("id") Long id) {
		return taxeService.getTaxeById(id);
	}

	@GetMapping("/taxes")
	public List<Taxe> displayAllTaxes() {
		return taxeService.getAllTaxes();
	}

	@PutMapping("/taxes/{id}")  
	public ResponseEntity<String> updateTaxe(@RequestBody Taxe taxe, @PathVariable("id") Long idtaxe)   
	{  
	
		taxeService.updateTaxe(taxe,idtaxe);  
	    return new ResponseEntity<String>("Taxe updated successfully",HttpStatus.OK);
	}
}
