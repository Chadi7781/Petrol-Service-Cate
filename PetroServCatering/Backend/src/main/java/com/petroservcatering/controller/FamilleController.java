
package com.petroservcatering.controller;

import java.util.ArrayList;
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
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import com.petroservcatering.exception.ResourceNotFoundException;
import com.petroservcatering.model.Famille;
import com.petroservcatering.model.SousFamille;
import com.petroservcatering.repository.FamilleRepository;
import com.petroservcatering.repository.SousFamilleRepository;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponses;
import io.swagger.annotations.ApiResponse;

@Api(value = "Swagger2DemoRestController", description = "REST APIs related to famille Entity!!!!")
@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/v1")
public class FamilleController {
	@Autowired
	private FamilleRepository familleRepository;
	@Autowired
	private SousFamilleRepository sousfamilleRepository;

	@ApiOperation(value = "Get list of familles in the System ", response = Iterable.class, tags = "getFamilles")
	@ApiResponses(value = { 
	            @ApiResponse(code = 200, message = "Success|OK"),
	            @ApiResponse(code = 401, message = "not authorized!"), 
	            @ApiResponse(code = 403, message = "forbidden!!!"),
	            @ApiResponse(code = 404, message = "not found!!!") })
	@GetMapping("/familles")
	public List<Famille> getAllFamilles() {
		return familleRepository.findAll();
	}
	/**
	 * @return
	 */
	@GetMapping("/famille")
	public Famille getInitFamille() {
	 List<Famille> familles = new ArrayList<Famille>();
	 familles= familleRepository.findAll();
     Famille famille = new Famille();
	 
	 return famille;
	}

	@GetMapping("/familles/{id}")
	public ResponseEntity<Famille> getFamilleById(@PathVariable(value = "id") Long familleId)
			throws ResourceNotFoundException {
		Famille famille = familleRepository.findById(familleId)
				.orElseThrow(() -> new ResourceNotFoundException("Famille not found for this id :: " + familleId));
		return ResponseEntity.ok().body(famille);
	}
	
	
	@GetMapping("/familles/sousfamilles")
	@ResponseBody
	public ResponseEntity<List<SousFamille>> getSousFamilleByIdFamille(@RequestBody Famille famille)
			throws ResourceNotFoundException {

		List<SousFamille> sousFamilles = familleRepository.findSousFamillesIdFamille(famille);
		
		return ResponseEntity.ok().body(sousFamilles);
	}
	
	
	@PostMapping("/familles")
	public Famille createFamille(@Valid @RequestBody Famille famille) {
		Famille cmd= familleRepository.save(famille) ;
		List<SousFamille> sousFamilles = new ArrayList<SousFamille>();
		sousFamilles=famille.getSousFamilles();
		
		sousFamilles.forEach(element -> element.setFamille(cmd));
		
		sousfamilleRepository.saveAll(sousFamilles);
		return cmd;
	}

	@PutMapping("/familles/{id}")
	public ResponseEntity<Famille> updateFamille(@PathVariable(value = "id") Long familleId,
			@Valid @RequestBody Famille familleDetails) throws ResourceNotFoundException {
		Famille famille = familleRepository.findById(familleId)
				.orElseThrow(() -> new ResourceNotFoundException("Famille not found for this id :: " + familleId));

		famille.setId(familleDetails.getId());
		famille.setCode(familleDetails.getCode());
		famille.setName(familleDetails.getName());
		


		final Famille updatedFamille = familleRepository.save(famille);
		return ResponseEntity.ok(updatedFamille);
	}

	@DeleteMapping("/familles/{id}")
	public Map<String, Boolean> deleteFamille(@PathVariable(value = "id") Long familleId)
			throws ResourceNotFoundException {
		Famille famille = familleRepository.findById(familleId)
				.orElseThrow(() -> new ResourceNotFoundException("Famille not found for this id :: " + familleId));

		familleRepository.delete(famille);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return response;
	}
}

