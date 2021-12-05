

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
import com.petroservcatering.model.LigneCommande;
import com.petroservcatering.repository.LigneCommandeRepository;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponses;
import io.swagger.annotations.ApiResponse;

@Api(value = "Swagger2DemoRestController", description = "REST APIs related to ligneCommande Entity!!!!")
@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/v1")
public class LigneCommandeController {
	@Autowired
	private LigneCommandeRepository ligneCommandeRepository;

	@ApiOperation(value = "Get list of ligneCommandes in the System ", response = Iterable.class, tags = "getLigneCommandes")
	@ApiResponses(value = { 
	            @ApiResponse(code = 200, message = "Success|OK"),
	            @ApiResponse(code = 401, message = "not authorized!"), 
	            @ApiResponse(code = 403, message = "forbidden!!!"),
	            @ApiResponse(code = 404, message = "not found!!!") })
	@GetMapping("/ligneCommandes")
	public List<LigneCommande> getAllLigneCommandes() {
		return ligneCommandeRepository.findAll();
	}

	@GetMapping("/ligneCommandes/{id}")
	public ResponseEntity<LigneCommande> getLigneCommandeById(@PathVariable(value = "id") Long ligneCommandeId)
			throws ResourceNotFoundException {
		LigneCommande ligneCommande = ligneCommandeRepository.findById(ligneCommandeId)
				.orElseThrow(() -> new ResourceNotFoundException("LigneCommande not found for this id :: " + ligneCommandeId));
		return ResponseEntity.ok().body(ligneCommande);
	}

	@PostMapping("/ligneCommandes")
	public LigneCommande createLigneCommande(@Valid @RequestBody LigneCommande ligneCommande) {
		return ligneCommandeRepository.save(ligneCommande) ;
	}

	@PutMapping("/ligneCommandes/{id}")
	public ResponseEntity<LigneCommande> updateLigneCommande(@PathVariable(value = "id") Long ligneCommandeId,
			@Valid @RequestBody LigneCommande ligneCommandeDetails) throws ResourceNotFoundException {
		LigneCommande ligneCommande = ligneCommandeRepository.findById(ligneCommandeId)
				.orElseThrow(() -> new ResourceNotFoundException("LigneCommande not found for this id :: " + ligneCommandeId));

		ligneCommande.setQuantite(ligneCommandeDetails.getQuantite());
		ligneCommande.setTva(ligneCommandeDetails.getTva());
		ligneCommande.setTotalHt(ligneCommandeDetails.getTotalHt());
		ligneCommande.setTotalTtc(ligneCommandeDetails.getTotalTtc());
		ligneCommande.setTotalTaxe(ligneCommandeDetails.getTotalTaxe());


		final LigneCommande updatedLigneCommande = ligneCommandeRepository.save(ligneCommande);
		return ResponseEntity.ok(updatedLigneCommande);
	}

	@DeleteMapping("/ligneCommandes/{id}")
	public Map<String, Boolean> deleteLigneCommande(@PathVariable(value = "id") Long ligneCommandeId)
			throws ResourceNotFoundException {
		LigneCommande ligneCommande = ligneCommandeRepository.findById(ligneCommandeId)
				.orElseThrow(() -> new ResourceNotFoundException("LigneCommande not found for this id :: " + ligneCommandeId));

		ligneCommandeRepository.delete(ligneCommande);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return response;
	}
}

