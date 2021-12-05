package com.petroservcatering.model;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name = "ligneFactures")
public class LigneFacture {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
	
	@Column(name = "quantite", nullable = false)
    private int quantite;
	
	@Column(name = "tva", nullable = false)
	private int tva ;
	
	@Column(name = "totalHt", nullable = false)
	private double totalHt;
	
	@Column(name = "totalTtc", nullable = false)
	private double totalTtc;
	
	@Column(name = "totalTaxe", nullable = false)
	private double totalTaxe;
	
	@Column(name = "remise")
	private int remise;
	
	
	 @OneToOne(fetch = FetchType.LAZY)
	 @JoinColumn(name = "article_id")
	 private Articles article;
	 
	 @ManyToOne
	 @JoinColumn(name = "facture_id")
	 @JsonBackReference
	 private Facture facture;

	public LigneFacture() {
		
	}

	public LigneFacture(int quantite, int tva, double totalHt, double totalTtc, double totalTaxe, int remise,
			Articles article, Facture facture) {
		super();
		this.quantite = quantite;
		this.tva = tva;
		this.totalHt = totalHt;
		this.totalTtc = totalTtc;
		this.totalTaxe = totalTaxe;
		this.remise = remise;
		this.article = article;
		this.facture = facture;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public int getQuantite() {
		return quantite;
	}

	public void setQuantite(int quantite) {
		this.quantite = quantite;
	}

	public int getTva() {
		return tva;
	}

	public void setTva(int tva) {
		this.tva = tva;
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

	public int getRemise() {
		return remise;
	}

	public void setRemise(int remise) {
		this.remise = remise;
	}

	public Articles getArticle() {
		return article;
	}

	public void setArticle(Articles article) {
		this.article = article;
	}

	public Facture getFacture() {
		return facture;
	}

	public void setFacture(Facture facture) {
		this.facture = facture;
	}
	
	
}
