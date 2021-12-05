package com.petroservcatering.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.validation.Valid;

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
import com.petroservcatering.model.LigneDevis;
import com.petroservcatering.repository.LigneDevisRepository;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

@Api(value = "Swagger2DemoRestController", description = "REST APIs related to LigneDevis Entity!!!!")
@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/v1")
public class LigneDevisController {
	@Autowired
	private LigneDevisRepository ligneDevisRepository;

	@ApiOperation(value = "Get list of 	LigneDevis in the System ", response = Iterable.class, tags = "getLigneDevis")
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Success|OK"),
			@ApiResponse(code = 401, message = "not authorized!"), @ApiResponse(code = 403, message = "forbidden!!!"),
			@ApiResponse(code = 404, message = "not found!!!") })
	@GetMapping("/ligneDevis")
	public List<LigneDevis> getAllLigneDevis() {
		return ligneDevisRepository.findAll();
	}

	@GetMapping("/ligneDevis/{id}")
	public ResponseEntity<LigneDevis> getLigneDevisById(@PathVariable(value = "id") Long ligneDevisId)
			throws ResourceNotFoundException {
		LigneDevis ligneDevis = ligneDevisRepository.findById(ligneDevisId).orElseThrow(
				() -> new ResourceNotFoundException("LigneDevis not found for this id :: " + ligneDevisId));
		return ResponseEntity.ok().body(ligneDevis);
	}

	@PostMapping("/ligneDevis")
	public LigneDevis createLigneDevis(@Valid @RequestBody LigneDevis ligneDevis) {
		return ligneDevisRepository.save(ligneDevis);
	}

	@PutMapping("/ligneDevis/{id}")
	public ResponseEntity<LigneDevis> updateLigneDevis(@PathVariable(value = "id") Long ligneDevisId,
			@Valid @RequestBody LigneDevis ligneDevisDetails) throws ResourceNotFoundException {
		LigneDevis ligneDevis = ligneDevisRepository.findById(ligneDevisId).orElseThrow(
				() -> new ResourceNotFoundException("LigneDevis not found for this id :: " + ligneDevisId));

		ligneDevis.setQuantite(ligneDevisDetails.getQuantite());
		ligneDevis.setRemise(ligneDevisDetails.getRemise());
		ligneDevis.setTotalHt(ligneDevisDetails.getTotalHt());
		ligneDevis.setTotalTtc(ligneDevisDetails.getTotalTtc());
		ligneDevis.setTotalTaxe(ligneDevisDetails.getTotalTaxe());
		ligneDevis.setArticle(ligneDevisDetails.getArticle());
		ligneDevis.setDevis(ligneDevisDetails.getDevis());

		final LigneDevis updatedLigneDevis = ligneDevisRepository.save(ligneDevis);
		return ResponseEntity.ok(updatedLigneDevis);
	}

	@DeleteMapping("/ligneDevis/{id}")
	public Map<String, Boolean> deleteLigneDevis(@PathVariable(value = "id") Long ligneDevisId)
			throws ResourceNotFoundException {
		LigneDevis ligneDevis = ligneDevisRepository.findById(ligneDevisId).orElseThrow(
				() -> new ResourceNotFoundException("LigneDevis not found for this id :: " + ligneDevisId));

		ligneDevisRepository.delete(ligneDevis);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return response;
	}
}
