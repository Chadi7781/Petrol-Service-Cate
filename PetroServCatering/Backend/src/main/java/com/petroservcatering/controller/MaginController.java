
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
import com.petroservcatering.model.Magasin;
import com.petroservcatering.repository.MagasinRepository;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponses;
import io.swagger.annotations.ApiResponse;

@Api(value = "Swagger2DemoRestController", description = "REST APIs related to magasin Entity!!!!")
@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/v1")
public class MaginController {
	@Autowired
	private MagasinRepository magasinRepository;

	@ApiOperation(value = "Get list of magasins in the System ", response = Iterable.class, tags = "getMagasins")
	@ApiResponses(value = { 
	            @ApiResponse(code = 200, message = "Success|OK"),
	            @ApiResponse(code = 401, message = "not authorized!"), 
	            @ApiResponse(code = 403, message = "forbidden!!!"),
	            @ApiResponse(code = 404, message = "not found!!!") })
	@GetMapping("/magasins")
	public List<Magasin> getAllMagasins() {
		return magasinRepository.findAll();
	}

	@GetMapping("/magasins/{id}")
	public ResponseEntity<Magasin> getMagasinById(@PathVariable(value = "id") Long magasinId)
			throws ResourceNotFoundException {
		Magasin magasin = magasinRepository.findById(magasinId)
				.orElseThrow(() -> new ResourceNotFoundException("Magasin not found for this id :: " + magasinId));
		return ResponseEntity.ok().body(magasin);
	}

	@PostMapping("/magasins")
	public Magasin createMagasin(@Valid @RequestBody Magasin magasin) {
		return magasinRepository.save(magasin) ;
	}

	@PutMapping("/magasins/{id}")
	public ResponseEntity<Magasin> updateMagasin(@PathVariable(value = "id") Long magasinId,
			@Valid @RequestBody Magasin magasinDetails) throws ResourceNotFoundException {
		Magasin magasin = magasinRepository.findById(magasinId)
				.orElseThrow(() -> new ResourceNotFoundException("Magasin not found for this id :: " + magasinId));

		magasin.setDesignation(magasinDetails.getDesignation());
		magasin.setAdresse(magasinDetails.getAdresse());
		magasin.setFax(magasinDetails.getFax());
		magasin.setTel(magasinDetails.getTel());
		magasin.setResponsable(magasinDetails.getResponsable());


		final Magasin updatedMagasin = magasinRepository.save(magasin);
		return ResponseEntity.ok(updatedMagasin);
	}

	@DeleteMapping("/magasins/{id}")
	public Map<String, Boolean> deleteMagasin(@PathVariable(value = "id") Long magasinId)
			throws ResourceNotFoundException {
		Magasin magasin = magasinRepository.findById(magasinId)
				.orElseThrow(() -> new ResourceNotFoundException("Magasin not found for this id :: " + magasinId));

		magasinRepository.delete(magasin);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return response;
	}
}

