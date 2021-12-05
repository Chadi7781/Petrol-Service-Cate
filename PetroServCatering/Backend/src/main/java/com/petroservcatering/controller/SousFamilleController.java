

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
import com.petroservcatering.model.SousFamille;
import com.petroservcatering.repository.SousFamilleRepository;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponses;
import io.swagger.annotations.ApiResponse;

@Api(value = "Swagger2DemoRestController", description = "REST APIs related to sousFamille Entity!!!!")
@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/v1")
public class SousFamilleController {
	@Autowired
	private SousFamilleRepository sousFamilleRepository;

	@ApiOperation(value = "Get list of sousFamilles in the System ", response = Iterable.class, tags = "getSousFamilles")
	@ApiResponses(value = { 
	            @ApiResponse(code = 200, message = "Success|OK"),
	            @ApiResponse(code = 401, message = "not authorized!"), 
	            @ApiResponse(code = 403, message = "forbidden!!!"),
	            @ApiResponse(code = 404, message = "not found!!!") })
	@GetMapping("/sousFamilles")
	public List<SousFamille> getAllSousFamilles() {
		return sousFamilleRepository.findAll();
	}

	@GetMapping("/sousFamilles/{id}")
	public ResponseEntity<SousFamille> getSousFamilleById(@PathVariable(value = "id") Long sousFamilleId)
			throws ResourceNotFoundException {
		SousFamille sousFamille = sousFamilleRepository.findById(sousFamilleId)
				.orElseThrow(() -> new ResourceNotFoundException("SousFamille not found for this id :: " + sousFamilleId));
		return ResponseEntity.ok().body(sousFamille);
	}

	@PostMapping("/sousFamilles")
	public SousFamille createSousFamille(@Valid @RequestBody SousFamille sousFamille) {
		return sousFamilleRepository.save(sousFamille) ;
	}

	@PutMapping("/sousFamilles/{id}")
	public ResponseEntity<SousFamille> updateSousFamille(@PathVariable(value = "id") Long sousFamilleId,
			@Valid @RequestBody SousFamille sousFamilleDetails) throws ResourceNotFoundException {
		SousFamille sousFamille = sousFamilleRepository.findById(sousFamilleId)
				.orElseThrow(() -> new ResourceNotFoundException("SousFamille not found for this id :: " + sousFamilleId));

		sousFamille.setId(sousFamilleDetails.getId());
		sousFamille.setCode(sousFamilleDetails.getCode());
		sousFamille.setName(sousFamilleDetails.getName());
		sousFamille.setFamille(sousFamilleDetails.getFamille());


		final SousFamille updatedSousFamille = sousFamilleRepository.save(sousFamille);
		return ResponseEntity.ok(updatedSousFamille);
	}

	@DeleteMapping("/sousFamilles/{id}")
	public Map<String, Boolean> deleteSousFamille(@PathVariable(value = "id") Long sousFamilleId)
			throws ResourceNotFoundException {
		SousFamille sousFamille = sousFamilleRepository.findById(sousFamilleId)
				.orElseThrow(() -> new ResourceNotFoundException("SousFamille not found for this id :: " + sousFamilleId));

		sousFamilleRepository.delete(sousFamille);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return response;
	}
}
