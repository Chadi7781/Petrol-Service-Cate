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
import com.petroservcatering.model.Commande;
import com.petroservcatering.model.Devis;
import com.petroservcatering.model.Eetat;
import com.petroservcatering.model.LigneDevis;
import com.petroservcatering.repository.EtatRepository;
import com.petroservcatering.repository.LigneDevisRepository;
import com.petroservcatering.services.IDevisService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

@Api(value = "Swagger2DemoRestController", description = "REST APIs related to Devis Entity!!!!")
@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/v1")
public class DevisController {

	@Autowired
	private IDevisService devisService;

	@Autowired
	private LigneDevisRepository ligneDevisRepository;
	
	@Autowired
	private EtatRepository etatRepository;

	@ApiOperation(value = "Get list of 	Devis in the System ", response = Iterable.class, tags = "getDevis")
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Success|OK"),
			@ApiResponse(code = 401, message = "not authorized!"), @ApiResponse(code = 403, message = "forbidden!!!"),
			@ApiResponse(code = 404, message = "not found!!!") })
	@GetMapping("/deviss")
	public List<Devis> getAllDevis() {
		return devisService.getAllDevis();
	}

	@GetMapping("/devis")
	public Devis getInitDevis() {
		List<Devis> devisList = new ArrayList<Devis>();
		devisList = devisService.getAllDevis();
		Devis devis = new Devis();
		devisList.forEach(element -> {
			String maxnum = "000001";
			if (Integer.parseInt(maxnum) < Integer.parseInt(element.getNumero())) {
				maxnum = element.getNumero();
				maxnum = String.valueOf(Integer.parseInt(maxnum) + 1);
				maxnum = StringUtils.leftPad(maxnum, 6, "0");
			}
			devis.setNumero(maxnum);
		});
		Date date = java.util.Calendar.getInstance().getTime();
		devis.setDate(date);
		return devis;

	}

	@GetMapping("/devis/{id}")
	public ResponseEntity<Devis> getDevisById(@PathVariable(value = "id") Long devisId)
			throws ResourceNotFoundException {
		Devis devis = devisService.getDevisById(devisId)
				.orElseThrow(() -> new ResourceNotFoundException("Devis introuvable avec le code = " + devisId));
		return ResponseEntity.ok().body(devis);
	}

	@PostMapping("/devis")
	public Devis createDevis(@Valid @RequestBody Devis devis) {
		
		devis.setEtat(etatRepository.findByName(Eetat.Non_commandé));
		Devis d = devisService.addDevis(devis);
		List<LigneDevis> ligneDevisList = new ArrayList<LigneDevis>();
		ligneDevisList = devis.getLigneDevisList();
		ligneDevisList.forEach(element -> element.setDevis(d));
		ligneDevisRepository.saveAll(ligneDevisList);
		return d;
	}

	@PutMapping("/devis/{id}")
	public ResponseEntity<Devis> updateDevis(@PathVariable(value = "id") Long devisId,
			@Valid @RequestBody Devis devisDetails) throws ResourceNotFoundException {
		Devis devis = devisService.getDevisById(devisId)
				.orElseThrow(() -> new ResourceNotFoundException("Devis introuvable avec le code = " + devisId));
		devis.setNumero(devisDetails.getNumero());
		devis.setDate(devisDetails.getDate());
		devis.setRemise(devisDetails.getRemise());
		devis.setTotalHt(devisDetails.getTotalHt());
		devis.setTotalTtc(devisDetails.getTotalTtc());
		devis.setTotalTaxe(devisDetails.getTotalTaxe());
		devis.setEtat(devisDetails.getEtat());
		devis.setMarge(devisDetails.getMarge());
		devis.setFournisseur(devisDetails.getFournisseur());
		devis.setUser(devisDetails.getUser());
		devis.setLigneDevisList(devisDetails.getLigneDevisList());

		final Devis updatedDevis = devisService.addDevis(devis);
		return ResponseEntity.ok(updatedDevis);
	}
	
	@PutMapping("/devis/commander/{id}")
	public ResponseEntity<Devis> commanderDevis(@PathVariable(value = "id") Long devisId,
			@Valid @RequestBody Devis devisDetails) throws ResourceNotFoundException {
		Devis devis = devisService.getDevisById(devisId)
				.orElseThrow(() -> new ResourceNotFoundException("Devis not found for this id :: " + devisId));

		devis.setEtat(etatRepository.findByName(Eetat.Commandé));
		final Devis updatedDevis = devisService.addDevis(devis);
		return ResponseEntity.ok(updatedDevis);
	}

	@DeleteMapping("/devis/{id}")
	public Map<String, Boolean> deleteDevis(@PathVariable(value = "id") Long devisId) throws ResourceNotFoundException {
		Devis devis = devisService.getDevisById(devisId)
				.orElseThrow(() -> new ResourceNotFoundException("Devis introuvable avec le code = " + devisId));

		devisService.deleteDevis(devis.getId());
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return response;
	}

}
