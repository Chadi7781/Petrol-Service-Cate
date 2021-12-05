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
import com.petroservcatering.model.Fournisseur;
import com.petroservcatering.repository.FournisseurRepository;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponses;
import io.swagger.annotations.ApiResponse;

@Api(value = "Swagger2DemoRestController", description = "REST APIs related to fournisseur Entity!!!!")
@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/v1")
public class FournisseurController {
	@Autowired
	private FournisseurRepository fournisseurRepository;

	@ApiOperation(value = "Get list of fournisseurs in the System ", response = Iterable.class, tags = "getFournisseurs")
	@ApiResponses(value = { 
	            @ApiResponse(code = 200, message = "Success|OK"),
	            @ApiResponse(code = 401, message = "not authorized!"), 
	            @ApiResponse(code = 403, message = "forbidden!!!"),
	            @ApiResponse(code = 404, message = "not found!!!") })
	@GetMapping("/fournisseurs")
	public List<Fournisseur> getAllFournisseurs() {
		return fournisseurRepository.findAll();
	}

	@GetMapping("/fournisseurs/{id}")
	public ResponseEntity<Fournisseur> getFournisseurById(@PathVariable(value = "id") Long fournisseurId)
			throws ResourceNotFoundException {
		Fournisseur fournisseur = fournisseurRepository.findById(fournisseurId)
				.orElseThrow(() -> new ResourceNotFoundException("Fournisseur not found for this id :: " + fournisseurId));
		return ResponseEntity.ok().body(fournisseur);
	}

	@PostMapping("/fournisseurs")
	public Fournisseur createFournisseur(@Valid @RequestBody Fournisseur fournisseur) {
		return fournisseurRepository.save(fournisseur) ;
	}

	@PutMapping("/fournisseurs/{id}")
	public ResponseEntity<Fournisseur> updateFournisseur(@PathVariable(value = "id") Long fournisseurId,
			@Valid @RequestBody Fournisseur fournisseurDetails) throws ResourceNotFoundException {
		Fournisseur fournisseur = fournisseurRepository.findById(fournisseurId)
				.orElseThrow(() -> new ResourceNotFoundException("Fournisseur not found for this id :: " + fournisseurId));

		fournisseur.setNumero(fournisseurDetails.getNumero());
		fournisseur.setRaisonSociale(fournisseurDetails.getRaisonSociale());
		fournisseur.setAdresse(fournisseurDetails.getAdresse());
		fournisseur.setEmail(fournisseurDetails.getEmail());
		fournisseur.setTel(fournisseurDetails.getTel());
		fournisseur.setDate(fournisseurDetails.getDate());
		fournisseur.setMatriculeFiscale(fournisseurDetails.getMatriculeFiscale());


		final Fournisseur updatedFournisseur = fournisseurRepository.save(fournisseur);
		return ResponseEntity.ok(updatedFournisseur);
	}

	@DeleteMapping("/fournisseurs/{id}")
	public Map<String, Boolean> deleteFournisseur(@PathVariable(value = "id") Long fournisseurId)
			throws ResourceNotFoundException {
		Fournisseur fournisseur = fournisseurRepository.findById(fournisseurId)
				.orElseThrow(() -> new ResourceNotFoundException("Fournisseur not found for this id :: " + fournisseurId));

		fournisseurRepository.delete(fournisseur);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return response;
	}
}

