package com.petroservcatering.controller;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.validation.Valid;
import org.apache.commons.lang3.StringUtils;
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
import com.petroservcatering.model.BonReception;
import com.petroservcatering.model.Eetat;
import com.petroservcatering.model.LigneReception;
import com.petroservcatering.model.StockMagasin;
import com.petroservcatering.repository.BonReceptionRepository;
import com.petroservcatering.repository.EtatRepository;
import com.petroservcatering.repository.LigneReceptionRepository;
import com.petroservcatering.repository.StockMagasinRepository;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponses;
import io.swagger.annotations.ApiResponse;

@Api(value = "Swagger2DemoRestController", description = "REST APIs related to bonReception Entity!!!!")
@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/v1")
public class BonReceptionController {
	@Autowired
	private BonReceptionRepository bonReceptionRepository;
	@Autowired
	private LigneReceptionRepository ligneReceptionRepository;
	@Autowired
	private StockMagasinRepository stockMagasinRepository;
	@Autowired
	private EtatRepository etatRepository;
	
	@ApiOperation(value = "Get list of bonReceptions in the System ", response = Iterable.class, tags = "getBonReceptions")
	@ApiResponses(value = { 
	            @ApiResponse(code = 200, message = "Success|OK"),
	            @ApiResponse(code = 401, message = "not authorized!"), 
	            @ApiResponse(code = 403, message = "forbidden!!!"),
	            @ApiResponse(code = 404, message = "not found!!!") })
	@GetMapping("/bonReceptions")
	public List<BonReception> getAllBonReceptions() {
		return bonReceptionRepository.findAll();
	}
	/**
	 * @return
	 */
	@GetMapping("/bonReception")
	public BonReception getInitBonReception() {
	 List<BonReception> bonReceptions = new ArrayList<BonReception>();
	 bonReceptions= bonReceptionRepository.findAll();
     BonReception bonReception = new BonReception();
	 bonReceptions.forEach(element -> {
	  String maxnum="000001";
	  if (Integer.parseInt(maxnum)<Integer.parseInt(element.getNumero())) {
		  maxnum=element.getNumero();
		  maxnum = String.valueOf(Integer.parseInt(maxnum)+1);
		  maxnum=StringUtils.leftPad(maxnum, 6, "0");}  
	      bonReception.setNumero(maxnum);
	  });
	 Date date=java.util.Calendar.getInstance().getTime();
     bonReception.setDate(date);	 
	 return bonReception;
	}

	@GetMapping("/bonReceptions/{id}")
	public ResponseEntity<BonReception> getBonReceptionById(@PathVariable(value = "id") Long bonReceptionId)
			throws ResourceNotFoundException {
		BonReception bonReception = bonReceptionRepository.findById(bonReceptionId)
			.orElseThrow(() -> new ResourceNotFoundException("BonReception not found for this id :: " + bonReceptionId));
		return ResponseEntity.ok().body(bonReception);
	}

	@PostMapping("/bonReceptions")
	public BonReception createBonReception(@Valid @RequestBody BonReception bonReception) {
		
		bonReception.setEtat(etatRepository.findByName(Eetat.Non_receptionné));
		BonReception bonreception= bonReceptionRepository.save(bonReception) ;
		List<LigneReception> ligneReceptions = new ArrayList<LigneReception>();
		ligneReceptions=bonReception.getLigneReceptions();
		StockMagasin stockMagasin=new StockMagasin() ;
		ligneReceptions.forEach(element ->{
	        element.setBonreception(bonreception);
			stockMagasin.setArticle(element.getArticle());
			stockMagasin.setMagasin(bonreception.getMagasin());
			stockMagasin.setQuantite(element.getQuantite());
			stockMagasin.setDateValidite(element.getDateValidite());
			stockMagasin.setDateReception(bonreception.getDate());
			stockMagasinRepository.save(stockMagasin);
		});		
		ligneReceptionRepository.saveAll(ligneReceptions);
		return bonreception;
	}

	@PutMapping("/bonReceptions/{id}")
	public ResponseEntity<BonReception> updateBonReception(@PathVariable(value = "id") Long bonReceptionId,
			@Valid @RequestBody BonReception bonReceptionDetails) throws ResourceNotFoundException {
		BonReception bonReception = bonReceptionRepository.findById(bonReceptionId)
				.orElseThrow(() -> new ResourceNotFoundException("BonReception not found for this id :: " + bonReceptionId));

		bonReception.setNumero(bonReceptionDetails.getNumero());
		bonReception.setDate(bonReceptionDetails.getDate());
		bonReception.setTotalHt(bonReceptionDetails.getTotalHt());
		bonReception.setTotalTtc(bonReceptionDetails.getTotalTtc());
		bonReception.setTotalTaxe(bonReceptionDetails.getTotalTaxe());


		final BonReception updatedBonReception = bonReceptionRepository.save(bonReception);
		return ResponseEntity.ok(updatedBonReception);
	}

	@DeleteMapping("/bonReceptions/{id}")
	public Map<String, Boolean> deleteBonReception(@PathVariable(value = "id") Long bonReceptionId)
			throws ResourceNotFoundException {
		BonReception bonReception = bonReceptionRepository.findById(bonReceptionId)
				.orElseThrow(() -> new ResourceNotFoundException("BonReception not found for this id :: " + bonReceptionId));

		bonReceptionRepository.delete(bonReception);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return response;
	}
}

