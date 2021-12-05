package com.petroservcatering.controller;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.validation.Valid;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.petroservcatering.exception.ResourceNotFoundException;
import com.petroservcatering.model.Eetat;
import com.petroservcatering.model.Facture;
import com.petroservcatering.model.LigneFacture;
import com.petroservcatering.repository.EtatRepository;
import com.petroservcatering.repository.FactureRepository;
import com.petroservcatering.repository.LigneFactureRepository;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponses;
import io.swagger.annotations.ApiResponse;

@Api(value = "Swagger2DemoRestController", description = "REST APIs related to facture Entity!!!!")
@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/v1")
public class FactureController {
	@Autowired
	private FactureRepository factureRepository;
	@Autowired
	private LigneFactureRepository ligneFactureRepository;
	@Autowired
	private EtatRepository etatRepository;
	
	@ApiOperation(value = "Get list of factures in the System ", response = Iterable.class, tags = "getFactures")
	@ApiResponses(value = { 
	            @ApiResponse(code = 200, message = "Success|OK"),
	            @ApiResponse(code = 401, message = "not authorized!"), 
	            @ApiResponse(code = 403, message = "forbidden!!!"),
	            @ApiResponse(code = 404, message = "not found!!!") })
	@GetMapping("/factures")
	public List<Facture> getAllFactures() {
		return factureRepository.findAll();
	}
	/**
	 * @return
	 */
	@GetMapping("/facture")
	public Facture getInitFacture() {
	 List<Facture> factures = new ArrayList<Facture>();
	 factures= factureRepository.findAll();
     Facture facture = new Facture();
	 factures.forEach(element -> {
	  String maxnum="000001";
	  if (Integer.parseInt(maxnum)<Integer.parseInt(element.getNumero())) {
		  maxnum=element.getNumero();
		  maxnum = String.valueOf(Integer.parseInt(maxnum)+1);
		  maxnum=StringUtils.leftPad(maxnum, 6, "0");}  
	      facture.setNumero(maxnum);
	  });
	 Date date=java.util.Calendar.getInstance().getTime();
     facture.setDate(date);	 
	 return facture;
	}

	@GetMapping("/factures/{id}")
	public ResponseEntity<Facture> getFactureById(@PathVariable(value = "id") Long factureId)
			throws ResourceNotFoundException {
		Facture facture = factureRepository.findById(factureId)
			.orElseThrow(() -> new ResourceNotFoundException("Facture not found for this id :: " + factureId));
		return ResponseEntity.ok().body(facture);
	}

	@PostMapping("/factures")
	public Facture createFacture(@Valid @RequestBody Facture facture) {
		
		facture.setEtat(etatRepository.findByName(Eetat.Non_reglé));
		Facture fact= factureRepository.save(facture) ;
		List<LigneFacture> ligneFactures = new ArrayList<LigneFacture>();
		ligneFactures=facture.getLigneFactures();
		ligneFactures.forEach(element ->{
	        element.setFacture(facture);
		});		
		ligneFactureRepository.saveAll(ligneFactures);
		return fact;
	}

	@PutMapping("/factures/{id}")
	public ResponseEntity<Facture> updateFacture(@PathVariable(value = "id") Long factureId,
			@Valid @RequestBody Facture factureDetails) throws ResourceNotFoundException {
		Facture facture = factureRepository.findById(factureId)
				.orElseThrow(() -> new ResourceNotFoundException("Facture not found for this id :: " + factureId));

		facture.setNumero(factureDetails.getNumero());
		facture.setDate(factureDetails.getDate());
		facture.setTotalHt(factureDetails.getTotalHt());
		facture.setTotalTtc(factureDetails.getTotalTtc());
		facture.setTotalTaxe(factureDetails.getTotalTaxe());
		facture.setTimbre(factureDetails.getTimbre());


		final Facture updatedFacture = factureRepository.save(facture);
		return ResponseEntity.ok(updatedFacture);
	}

	@DeleteMapping("/factures/{id}")
	public Map<String, Boolean> deleteFacture(@PathVariable(value = "id") Long factureId)
			throws ResourceNotFoundException {
		Facture facture = factureRepository.findById(factureId)
				.orElseThrow(() -> new ResourceNotFoundException("Facture not found for this id :: " + factureId));

		factureRepository.delete(facture);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return response;
	}
}

