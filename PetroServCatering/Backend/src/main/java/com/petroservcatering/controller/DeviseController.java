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
import com.petroservcatering.model.Devise;
import com.petroservcatering.repository.DeviseRepository;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

@Api(value = "Swagger2DemoRestController", description = "REST APIs related to magasin Entity!!!!")
@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/v1")
public class DeviseController {
	@Autowired
	private DeviseRepository deviseRepository;
	
	@ApiOperation(value = "Get list of devises in the System ", response = Iterable.class, tags = "getDevises")
	@ApiResponses(value = { 
	            @ApiResponse(code = 200, message = "Success|OK"),
	            @ApiResponse(code = 401, message = "not authorized!"), 
	            @ApiResponse(code = 403, message = "forbidden!!!"),
	            @ApiResponse(code = 404, message = "not found!!!") })
	@GetMapping("/devises")
	public List<Devise> getAllDevises(){
		return deviseRepository.findAll();
	}
	
	@GetMapping("/devises/{id}")
	public ResponseEntity<Devise> getDeviseById(@PathVariable(value = "id") Long deviseId)
			throws ResourceNotFoundException {
		Devise devise = deviseRepository.findById(deviseId)
				.orElseThrow(() -> new ResourceNotFoundException("Devise not found for this id :: " + deviseId));
		return ResponseEntity.ok().body(devise);
	}
	

	@PostMapping("/devises")
	public Devise createDevise(@Valid @RequestBody Devise devise) {
		return deviseRepository.save(devise) ;
	}

	@PutMapping("/devises/{id}")
	public ResponseEntity<Devise> updateDevise(@PathVariable(value = "id") Long deviseId,
			@Valid @RequestBody Devise deviseDetails) throws ResourceNotFoundException {
		Devise devise = deviseRepository.findById(deviseId)
				.orElseThrow(() -> new ResourceNotFoundException("Devise not found for this id :: " + deviseId));

		devise.setId(deviseDetails.getId());
		devise.setName(deviseDetails.getName());
		devise.setTaux(deviseDetails.getTaux());

		


		final Devise updatedDevise= deviseRepository.save(devise);
		return ResponseEntity.ok(updatedDevise);
	}

	@DeleteMapping("/devises/{id}")
	public Map<String, Boolean> deleteDevise(@PathVariable(value = "id") Long deviseId)
			throws ResourceNotFoundException {
		Devise devise = deviseRepository.findById(deviseId)
				.orElseThrow(() -> new ResourceNotFoundException("Devise not found for this id :: " + deviseId));

		deviseRepository.delete(devise);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return response;
	}

	
}
