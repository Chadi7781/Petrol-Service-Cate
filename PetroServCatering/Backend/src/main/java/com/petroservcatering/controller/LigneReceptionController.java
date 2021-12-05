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
import com.petroservcatering.model.LigneReception;
import com.petroservcatering.repository.LigneReceptionRepository;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponses;
import io.swagger.annotations.ApiResponse;

@Api(value = "Swagger2DemoRestController", description = "REST APIs related to ligneReception Entity!!!!")
@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/v1")
public class LigneReceptionController {
	@Autowired
	private LigneReceptionRepository ligneReceptionRepository;

	@ApiOperation(value = "Get list of ligneReceptions in the System ", response = Iterable.class, tags = "getLigneReceptions")
	@ApiResponses(value = { 
	            @ApiResponse(code = 200, message = "Success|OK"),
	            @ApiResponse(code = 401, message = "not authorized!"), 
	            @ApiResponse(code = 403, message = "forbidden!!!"),
	            @ApiResponse(code = 404, message = "not found!!!") })
	@GetMapping("/ligneReceptions")
	public List<LigneReception> getAllLigneReceptions() {
		return ligneReceptionRepository.findAll();
	}

	@GetMapping("/ligneReceptions/{id}")
	public ResponseEntity<LigneReception> getLigneReceptionById(@PathVariable(value = "id") Long ligneReceptionId)
			throws ResourceNotFoundException {
		LigneReception ligneReception = ligneReceptionRepository.findById(ligneReceptionId)
				.orElseThrow(() -> new ResourceNotFoundException("LigneReception not found for this id :: " + ligneReceptionId));
		return ResponseEntity.ok().body(ligneReception);
	}

	@PostMapping("/ligneReceptions")
	public LigneReception createLigneReception(@Valid @RequestBody LigneReception ligneReception) {
		return ligneReceptionRepository.save(ligneReception) ;
	}

	@PutMapping("/ligneReceptions/{id}")
	public ResponseEntity<LigneReception> updateLigneReception(@PathVariable(value = "id") Long ligneReceptionId,
			@Valid @RequestBody LigneReception ligneReceptionDetails) throws ResourceNotFoundException {
		LigneReception ligneReception = ligneReceptionRepository.findById(ligneReceptionId)
				.orElseThrow(() -> new ResourceNotFoundException("LigneReception not found for this id :: " + ligneReceptionId));

		ligneReception.setQuantite(ligneReceptionDetails.getQuantite());
		ligneReception.setTva(ligneReceptionDetails.getTva());
		ligneReception.setTotalHt(ligneReceptionDetails.getTotalHt());
		ligneReception.setTotalTtc(ligneReceptionDetails.getTotalTtc());
		ligneReception.setTotalTaxe(ligneReceptionDetails.getTotalTaxe());
		ligneReception.setArticle(ligneReceptionDetails.getArticle());
		ligneReception.setBonreception(ligneReceptionDetails.getBonreception());




		final LigneReception updatedLigneReception = ligneReceptionRepository.save(ligneReception);
		return ResponseEntity.ok(updatedLigneReception);
	}

	@DeleteMapping("/ligneReceptions/{id}")
	public Map<String, Boolean> deleteLigneReception(@PathVariable(value = "id") Long ligneReceptionId)
			throws ResourceNotFoundException {
		LigneReception ligneReception = ligneReceptionRepository.findById(ligneReceptionId)
				.orElseThrow(() -> new ResourceNotFoundException("LigneReception not found for this id :: " + ligneReceptionId));

		ligneReceptionRepository.delete(ligneReception);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return response;
	}
}

