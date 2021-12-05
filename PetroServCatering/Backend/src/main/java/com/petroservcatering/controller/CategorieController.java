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
import com.petroservcatering.model.Categorie;
import com.petroservcatering.repository.CategorieRepository;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

@Api(value = "Swagger2DemoRestController", description = "REST APIs related to magasin Entity!!!!")
@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/v1")
public class CategorieController {
	@Autowired
	private CategorieRepository categorieRepository;
	
	@ApiOperation(value = "Get list of categories in the System ", response = Iterable.class, tags = "getCategories")
	@ApiResponses(value = { 
	            @ApiResponse(code = 200, message = "Success|OK"),
	            @ApiResponse(code = 401, message = "not authorized!"), 
	            @ApiResponse(code = 403, message = "forbidden!!!"),
	            @ApiResponse(code = 404, message = "not found!!!") })
	@GetMapping("/categories")
	public List<Categorie> getAllCategories(){
		return categorieRepository.findAll();
	}
	
	@GetMapping("/categories/{id}")
	public ResponseEntity<Categorie> getCategorieById(@PathVariable(value = "id") Long categorieId)
			throws ResourceNotFoundException {
		Categorie categorie = categorieRepository.findById(categorieId)
				.orElseThrow(() -> new ResourceNotFoundException("Categorie not found for this id :: " + categorieId));
		return ResponseEntity.ok().body(categorie);
	}
	

	@PostMapping("/categories")
	public Categorie createCategorie(@Valid @RequestBody Categorie categorie) {
		return categorieRepository.save(categorie) ;
	}

	@PutMapping("/categories/{id}")
	public ResponseEntity<Categorie> updateCategorie(@PathVariable(value = "id") Long categorieId,
			@Valid @RequestBody Categorie categorieDetails) throws ResourceNotFoundException {
		Categorie categorie = categorieRepository.findById(categorieId)
				.orElseThrow(() -> new ResourceNotFoundException("Categorie not found for this id :: " + categorieId));

		categorie.setId(categorieDetails.getId());
		categorie.setCode(categorieDetails.getCode());
		categorie.setName(categorieDetails.getName());
		


		final Categorie updatedCategorie= categorieRepository.save(categorie);
		return ResponseEntity.ok(updatedCategorie);
	}

	@DeleteMapping("/categories/{id}")
	public Map<String, Boolean> deleteCategorie(@PathVariable(value = "id") Long categorieId)
			throws ResourceNotFoundException {
		Categorie categorie = categorieRepository.findById(categorieId)
				.orElseThrow(() -> new ResourceNotFoundException("Categorie not found for this id :: " + categorieId));

		categorieRepository.delete(categorie);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return response;
	}

	
}
