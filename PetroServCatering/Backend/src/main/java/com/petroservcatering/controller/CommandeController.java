
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
import com.petroservcatering.model.Commande;
import com.petroservcatering.model.Devis;
import com.petroservcatering.model.Eetat;
import com.petroservcatering.model.Facture;
import com.petroservcatering.model.LigneCommande;
import com.petroservcatering.model.LigneFacture;
import com.petroservcatering.repository.CommandeRepository;
import com.petroservcatering.repository.EtatRepository;
import com.petroservcatering.repository.LigneCommandeRepository;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponses;
import io.swagger.annotations.ApiResponse;

@Api(value = "Swagger2DemoRestController", description = "REST APIs related to commande Entity!!!!")
@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/v1")
public class CommandeController {
	@Autowired
	private CommandeRepository commandeRepository;
	@Autowired
	private LigneCommandeRepository lignecommandeRepository;
	@Autowired
	private EtatRepository etatRepository;

	@ApiOperation(value = "Get list of commandes in the System ", response = Iterable.class, tags = "getCommandes")
	@ApiResponses(value = { 
	            @ApiResponse(code = 200, message = "Success|OK"),
	            @ApiResponse(code = 401, message = "not authorized!"), 
	            @ApiResponse(code = 403, message = "forbidden!!!"),
	            @ApiResponse(code = 404, message = "not found!!!") })
	@GetMapping("/commandes")
	public List<Commande> getAllCommandes() {
		return commandeRepository.findAll();
	}
	/**
	 * @return
	 */
	@GetMapping("/commande")
	public Commande getInitCommande() {
	 List<Commande> commandes = new ArrayList<Commande>();
	 commandes= commandeRepository.findAll();
     Commande commande = new Commande();
     commande.setNumero("000001");
	 commandes.forEach(element -> {
	  String maxnum="000001";
	  if (Integer.parseInt(maxnum)<Integer.parseInt(element.getNumero())) {
		  maxnum=element.getNumero();
		  maxnum = String.valueOf(Integer.parseInt(maxnum)+1);
		  maxnum=StringUtils.leftPad(maxnum, 6, "0");}  
	      commande.setNumero(maxnum);
	  });
	 Date date=java.util.Calendar.getInstance().getTime();
     commande.setDate(date);	 
	 return commande;
	}

	@GetMapping("/commandes/{id}")
	public ResponseEntity<Commande> getCommandeById(@PathVariable(value = "id") Long commandeId)
			throws ResourceNotFoundException {
		Commande commande = commandeRepository.findById(commandeId)
				.orElseThrow(() -> new ResourceNotFoundException("Commande not found for this id :: " + commandeId));
		return ResponseEntity.ok().body(commande);
	}

	@PostMapping("/commandes")
	public Commande createCommande(@Valid @RequestBody Commande commande) {
		
		commande.setEtat(etatRepository.findByName(Eetat.Non_validé));
		Commande cmd= commandeRepository.save(commande) ;
		List<LigneCommande> ligneCommandes = new ArrayList<LigneCommande>();
		ligneCommandes=commande.getLigneCommandes();
		
		ligneCommandes.forEach(element -> element.setCommande(cmd));
		
		lignecommandeRepository.saveAll(ligneCommandes);
		return cmd;
	}

	@PutMapping("/commandes/{id}")
	public ResponseEntity<Commande> updateCommande(@PathVariable(value = "id") Long commandeId,
			@Valid @RequestBody Commande commandeDetails) throws ResourceNotFoundException {
		Commande commande = commandeRepository.findById(commandeId)
				.orElseThrow(() -> new ResourceNotFoundException("Commande not found for this id :: " + commandeId));

		commande.setNumero(commandeDetails.getNumero());
		commande.setDate(commandeDetails.getDate());
		commande.setTotalHt(commandeDetails.getTotalHt());
		commande.setTotalTtc(commandeDetails.getTotalTtc());
		commande.setTotalTaxe(commandeDetails.getTotalTaxe());
		commande.setRemise(commandeDetails.getRemise());
		commande.setDevis(commandeDetails.getDevis());

		final Commande updatedCommande = commandeRepository.save(commande);
		return ResponseEntity.ok(updatedCommande);
	}
	
	@PutMapping("/commande/{id}")
	public ResponseEntity<Commande> validerCommande(@PathVariable(value = "id") Long commandeId,
			@Valid @RequestBody Commande commandeDetails) throws ResourceNotFoundException {
		Commande commande = commandeRepository.findById(commandeId)
				.orElseThrow(() -> new ResourceNotFoundException("Commande not found for this id :: " + commandeId));

		commande.setEtat(etatRepository.findByName(Eetat.Validé));
		final Commande updatedCommande = commandeRepository.save(commande);
		return ResponseEntity.ok(updatedCommande);
	}
	
	// Un Api qui test si les articles d'une commande sont de type service ou non
	@PostMapping("/commandes/service")
	public Boolean genererFactureService(@Valid @RequestBody Commande commande) throws Exception{
		List<LigneCommande> ligneCommandes = new ArrayList<LigneCommande>();
		ligneCommandes = commande.getLigneCommandes();
		for( int i = 0; i < ligneCommandes.size(); i++) {
			if( !ligneCommandes.get(i).getArticle().getTypeArticle().getDesignation().toLowerCase().equals("service")) {
				return false;
			}
		}
		return true;
		
	}
	
	@PutMapping("/commande/facturer/{id}")
	public ResponseEntity<Commande> facturerCommande(@PathVariable(value = "id") Long commandeId,
			@Valid @RequestBody Commande commandeDetails) throws ResourceNotFoundException {
		Commande commande = commandeRepository.findById(commandeId)
				.orElseThrow(() -> new ResourceNotFoundException("Commande not found for this id :: " + commandeId));

		commande.setEtat(etatRepository.findByName(Eetat.Facturé));
		final Commande updatedCommande = commandeRepository.save(commande);
		return ResponseEntity.ok(updatedCommande);
	}

	@DeleteMapping("/commandes/{id}")
	public Map<String, Boolean> deleteCommande(@PathVariable(value = "id") Long commandeId)
			throws ResourceNotFoundException {
		Commande commande = commandeRepository.findById(commandeId)
				.orElseThrow(() -> new ResourceNotFoundException("Commande not found for this id :: " + commandeId));
		Devis devis = new Devis();
		devis = commande.getDevis();
		devis.setEtat(etatRepository.findByName(Eetat.Non_commandé));
		commandeRepository.delete(commande);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return response;
	}
}

