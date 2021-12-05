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
import com.petroservcatering.model.TypeArticle;
import com.petroservcatering.repository.TypeArticleRepository;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

@Api(value = "Swagger2DemoRestController", description = "REST APIs related to magasin Entity!!!!")
@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/v1")
public class TypeArticleController {
	@Autowired
	private TypeArticleRepository typeArticleRepository;
	
	@ApiOperation(value = "Get list of typeArticles in the System ", response = Iterable.class, tags = "getTypeArticles")
	@ApiResponses(value = { 
	            @ApiResponse(code = 200, message = "Success|OK"),
	            @ApiResponse(code = 401, message = "not authorized!"), 
	            @ApiResponse(code = 403, message = "forbidden!!!"),
	            @ApiResponse(code = 404, message = "not found!!!") })
	@GetMapping("/typeArticles")
	public List<TypeArticle> getAllTypeArticles(){
		return typeArticleRepository.findAll();
	}
	
	@GetMapping("/typeArticles/{id}")
	public ResponseEntity<TypeArticle> getTypeArticleById(@PathVariable(value = "id") Long typeArticleId)
			throws ResourceNotFoundException {
		TypeArticle typeArticle = typeArticleRepository.findById(typeArticleId)
				.orElseThrow(() -> new ResourceNotFoundException("TypeArticle not found for this id :: " + typeArticleId));
		return ResponseEntity.ok().body(typeArticle);
	}
	

	@PostMapping("/typeArticles")
	public TypeArticle createTypeArticle(@Valid @RequestBody TypeArticle typeArticle) {
		return typeArticleRepository.save(typeArticle) ;
	}

	@PutMapping("/typeArticles/{id}")
	public ResponseEntity<TypeArticle> updateTypeArticle(@PathVariable(value = "id") Long typeArticleId,
			@Valid @RequestBody TypeArticle typeArticleDetails) throws ResourceNotFoundException {
		TypeArticle typeArticle = typeArticleRepository.findById(typeArticleId)
				.orElseThrow(() -> new ResourceNotFoundException("TypeArticle not found for this id :: " + typeArticleId));

		typeArticle.setId(typeArticleDetails.getId());
		typeArticle.setCode(typeArticleDetails.getCode());
		typeArticle.setDesignation(typeArticleDetails.getDesignation());
		


		final TypeArticle updatedTypeArticle= typeArticleRepository.save(typeArticle);
		return ResponseEntity.ok(updatedTypeArticle);
	}

	@DeleteMapping("/typeArticles/{id}")
	public Map<String, Boolean> deleteTypeArticle(@PathVariable(value = "id") Long typeArticleId)
			throws ResourceNotFoundException {
		TypeArticle typeArticle = typeArticleRepository.findById(typeArticleId)
				.orElseThrow(() -> new ResourceNotFoundException("TypeArticle not found for this id :: " + typeArticleId));

		typeArticleRepository.delete(typeArticle);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return response;
	}

	
}
