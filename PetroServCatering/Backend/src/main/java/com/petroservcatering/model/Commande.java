package com.petroservcatering.model;


import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import java.util.List;

@Entity
@Table(name = "commandes")
public class Commande {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
	
	@Column(name = "numero", nullable = false)
	private String numero;
	
	@Column(name = "date", nullable = false)
	private Date date;
	
	@Column(name = "totalHt", nullable = false)
	private double totalHt;
	
	@Column(name = "remise", nullable = false)
	private double remise;
	
	@Column(name = "totalTtc", nullable = false)
	private double totalTtc;
	
	@Column(name = "totalTaxe", nullable = false)
	private double totalTaxe;
	
	@ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "etat_id")
	private Etat etat;
	
	@ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "fournisseur_id")
    private Fournisseur fournisseur;	
    
    @OneToMany(cascade= CascadeType.ALL)
    @JoinColumn(name = "commande_id")
    @JsonManagedReference
	private List<LigneCommande> ligneCommandes ;
    
    @OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "devis_id")
	private Devis devis;
    
	
    
	public List<LigneCommande> getLigneCommandes() {
		return ligneCommandes;
	}

	public void setLigneCommandes(List<LigneCommande> ligneCommandes) {
		this.ligneCommandes = ligneCommandes;
	}

	public Commande() {
		
	}

	public Commande(String numero, Date date, double totalHt, double totalTtc, double totalTaxe,double remise,
		   Etat etat, Fournisseur fournisseur, List<LigneCommande> ligneCommandes, Devis devis) {
		super();
		this.numero = numero;
		this.date = date;
		this.totalHt = totalHt;
		this.totalTtc = totalTtc;
		this.totalTaxe = totalTaxe;
		this.remise = remise;
		this.etat = etat;
		this.fournisseur = fournisseur;
		this.ligneCommandes = ligneCommandes;
		this.devis = devis;
	}

	
	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getNumero() {
		return numero;
	}

	public void setNumero(String numero) {
		this.numero = numero;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public double getTotalHt() {
		return totalHt;
	}

	public void setTotalHt(double totalHt) {
		this.totalHt = totalHt;
	}

	public double getTotalTtc() {
		return totalTtc;
	}

	public void setTotalTtc(double totalTtc) {
		this.totalTtc = totalTtc;
	}

	public double getTotalTaxe() {
		return totalTaxe;
	}

	public void setTotalTaxe(double totalTaxe) {
		this.totalTaxe = totalTaxe;
	}

	
	public double getRemise() {
		return remise;
	}

	public void setRemise(double remise) {
		this.remise = remise;
	}

	public Etat getEtat() {
		return etat;
	}

	public void setEtat(Etat etat) {
		this.etat = etat;
	}

	public Fournisseur getFournisseur() {
		return fournisseur;
	}

	public void setFournisseur(Fournisseur fournisseur) {
		this.fournisseur = fournisseur;
	}

	public Devis getDevis() {
		return devis;
	}

	public void setDevis(Devis devis) {
		this.devis = devis;
	}
}
