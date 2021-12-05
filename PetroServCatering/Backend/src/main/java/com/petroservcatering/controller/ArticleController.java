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
import com.petroservcatering.model.Articles;
import com.petroservcatering.model.Taxe;
import com.petroservcatering.repository.ArticleRepository;
import com.petroservcatering.repository.TaxeRepository;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponses;
import io.swagger.annotations.ApiResponse;

@Api(value = "Swagger2DemoRestController", description = "REST APIs related to Article Entity!!!!")
@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/v1")
public class ArticleController {
	@Autowired
	private ArticleRepository articleRepository;
	
	@Autowired
	private TaxeRepository taxeRepository;
	
	
	@ApiOperation(value = "Get list of 	Aricles in the System ", response = Iterable.class, tags = "getStudents")
	@ApiResponses(value = { 
	            @ApiResponse(code = 200, message = "Success|OK"),
	            @ApiResponse(code = 401, message = "not authorized!"), 
	            @ApiResponse(code = 403, message = "forbidden!!!"),
	            @ApiResponse(code = 404, message = "not found!!!") })
	@GetMapping("/articles")
	public List<Articles> getAllArticles() {
		return articleRepository.findAll();
	}

	@GetMapping("/articles/{id}")
	public ResponseEntity<Articles> getArticlesById(@PathVariable(value = "id") Long articleId)
			throws ResourceNotFoundException {
		Articles articles = articleRepository.findById(articleId)
				.orElseThrow(() -> new ResourceNotFoundException("Articles not found for this id :: " + articleId));
		return ResponseEntity.ok().body(articles);
	}

	@PostMapping("/articles")
	public Articles createArticles(@Valid @RequestBody Articles articles) {
		
		 //  for(Taxe taxe: articles.getTaxe()) {
		//     Taxe taxecurrent = taxe.getMedalById(s.getId());
	            //         ss.getMedals().add(soldier);
		//      medalService.addMedal(ss);
	            //     }     

		
       

		return articleRepository.save(articles);
	}

	@PutMapping("/articles/{id}")
	public ResponseEntity<Articles> updateArticles(@PathVariable(value = "id") Long articleId,
			@Valid @RequestBody Articles articleDetails) throws ResourceNotFoundException {
		Articles article = articleRepository.findById(articleId)
				.orElseThrow(() -> new ResourceNotFoundException("Articles not found for this id :: " + articleId));

		article.setReference(articleDetails.getReference());
		article.setName(articleDetails.getName());
		article.setPrix(articleDetails.getPrix());
		article.setTva(articleDetails.getTva());
		article.setMarge(articleDetails.getMarge());
		article.setUnite(articleDetails.getUnite());
		article.setCategorie(articleDetails.getCategorie());
		article.setTaxes(articleDetails.getTaxes());
		article.setFamille(articleDetails.getFamille());
		article.setSousFamille(articleDetails.getSousFamille());
		article.setDestination(articleDetails.getDestination());
		article.setDurabilite(articleDetails.getDurabilite());

		final Articles updatedArticles = articleRepository.save(article);
		return ResponseEntity.ok(updatedArticles);
	}

	@DeleteMapping("/articles/{id}")
	public Map<String, Boolean> deleteArticles(@PathVariable(value = "id") Long articleId)
			throws ResourceNotFoundException {
		Articles article = articleRepository.findById(articleId)
				.orElseThrow(() -> new ResourceNotFoundException("Articles not found for this id :: " + articleId));

		articleRepository.delete(article);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return response;
	}
}
