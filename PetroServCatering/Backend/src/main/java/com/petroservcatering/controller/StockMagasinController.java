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
import com.petroservcatering.model.StockMagasin;
import com.petroservcatering.repository.StockMagasinRepository;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponses;
import io.swagger.annotations.ApiResponse;

@Api(value = "Swagger2DemoRestController", description = "REST APIs related to stockMagasin Entity!!!!")
@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/v1")
public class StockMagasinController {
	@Autowired
	private StockMagasinRepository stockMagasinRepository;

	@ApiOperation(value = "Get list of stockMagasins in the System ", response = Iterable.class, tags = "getStockMagasins")
	@ApiResponses(value = { 
	            @ApiResponse(code = 200, message = "Success|OK"),
	            @ApiResponse(code = 401, message = "not authorized!"), 
	            @ApiResponse(code = 403, message = "forbidden!!!"),
	            @ApiResponse(code = 404, message = "not found!!!") })
	@GetMapping("/stockMagasins")
	public List<StockMagasin> getAllStockMagasins() {
		return stockMagasinRepository.findAll();
	}

	@GetMapping("/stockMagasins/{id}")
	public ResponseEntity<StockMagasin> getStockMagasinById(@PathVariable(value = "id") Long stockMagasinId)
			throws ResourceNotFoundException {
		StockMagasin stockMagasin = stockMagasinRepository.findById(stockMagasinId)
				.orElseThrow(() -> new ResourceNotFoundException("StockMagasin not found for this id :: " + stockMagasinId));
		return ResponseEntity.ok().body(stockMagasin);
	}

	@PostMapping("/stockMagasins")
	public StockMagasin createStockMagasin(@Valid @RequestBody StockMagasin stockMagasin) {
		System.out.print("gtt!!!!!!!!!!!!"+stockMagasin);
		return stockMagasinRepository.save(stockMagasin) ;
	}

	@PutMapping("/stockMagasins/{id}")
	public ResponseEntity<StockMagasin> updateStockMagasin(@PathVariable(value = "id") Long stockMagasinId,
			@Valid @RequestBody StockMagasin stockMagasinDetails) throws ResourceNotFoundException {
		StockMagasin stockMagasin = stockMagasinRepository.findById(stockMagasinId)
				.orElseThrow(() -> new ResourceNotFoundException("StockMagasin not found for this id :: " + stockMagasinId));

		stockMagasin.setQuantite(stockMagasinDetails.getQuantite());
		stockMagasin.setArticle(stockMagasinDetails.getArticle());
		stockMagasin.setDateReception(stockMagasinDetails.getDateReception());
		stockMagasin.setDateValidite(stockMagasinDetails.getDateValidite());
		stockMagasin.setMagasin(stockMagasinDetails.getMagasin());



		final StockMagasin updatedStockMagasin = stockMagasinRepository.save(stockMagasin);
		return ResponseEntity.ok(updatedStockMagasin);
	}

	@DeleteMapping("/stockMagasins/{id}")
	public Map<String, Boolean> deleteStockMagasin(@PathVariable(value = "id") Long stockMagasinId)
			throws ResourceNotFoundException {
		StockMagasin stockMagasin = stockMagasinRepository.findById(stockMagasinId)
				.orElseThrow(() -> new ResourceNotFoundException("StockMagasin not found for this id :: " + stockMagasinId));

		stockMagasinRepository.delete(stockMagasin);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return response;
	}
}

