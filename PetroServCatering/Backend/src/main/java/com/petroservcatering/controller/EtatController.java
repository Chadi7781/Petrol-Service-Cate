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
import com.petroservcatering.model.Etat;
import com.petroservcatering.repository.EtatRepository;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponses;
import io.swagger.annotations.ApiResponse;

@Api(value = "Swagger2DemoRestController", description = "REST APIs related to etat Entity!!!!")
@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/v1")
public class EtatController {
	@Autowired
	private EtatRepository etatRepository;

	@ApiOperation(value = "Get list of etats in the System ", response = Iterable.class, tags = "getEtats")
	@ApiResponses(value = { 
	            @ApiResponse(code = 200, message = "Success|OK"),
	            @ApiResponse(code = 401, message = "not authorized!"), 
	            @ApiResponse(code = 403, message = "forbidden!!!"),
	            @ApiResponse(code = 404, message = "not found!!!") })
	@GetMapping("/etats")
	public List<Etat> getAllEtats() {
		return etatRepository.findAll();
	}
	
	@GetMapping("/etats/{id}")
	public ResponseEntity<Etat> getEtatById(@PathVariable(value = "id") Long etatId)
			throws ResourceNotFoundException {
		Etat etat = etatRepository.findById(etatId)
				.orElseThrow(() -> new ResourceNotFoundException("Etat not found for this id :: " + etatId));
		return ResponseEntity.ok().body(etat);
	}

	@PostMapping("/etats")
	public Etat createEtat(@Valid @RequestBody Etat etat) {
		Etat cmd= etatRepository.save(etat) ;	
		return cmd;
	}

	@PutMapping("/etats/{id}")
	public ResponseEntity<Etat> updateEtat(@PathVariable(value = "id") Long etatId,
			@Valid @RequestBody Etat etatDetails) throws ResourceNotFoundException {
		Etat etat = etatRepository.findById(etatId)
				.orElseThrow(() -> new ResourceNotFoundException("Etat not found for this id :: " + etatId));

		etat.setId(etatDetails.getId());
		etat.setName(etatDetails.getName());
		


		final Etat updatedEtat = etatRepository.save(etat);
		return ResponseEntity.ok(updatedEtat);
	}

	@DeleteMapping("/etats/{id}")
	public Map<String, Boolean> deleteEtat(@PathVariable(value = "id") Long etatId)
			throws ResourceNotFoundException {
		Etat etat = etatRepository.findById(etatId)
				.orElseThrow(() -> new ResourceNotFoundException("Etat not found for this id :: " + etatId));

		etatRepository.delete(etat);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return response;
	}
}

