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
@Table(name = "ligneDevis")
public class LigneDevis {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
	
	@Column(name = "quantite", nullable = false)
	private int quantite;
	
	@Column(name = "remise", nullable = false)
	private int remise;
	
	@Column(name = "totalHt", nullable = false)
	private double totalHt;
	
	@Column(name = "totalTtc", nullable = false)
	private double totalTtc;
	
	@Column(name = "totalTaxe", nullable = false)
	private double totalTaxe;
	
	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "article_id")
	private Articles article;
	
	@ManyToOne
	@JoinColumn(name = "devis_id")
	@JsonBackReference
	private Devis devis;
	
	public LigneDevis () {
		
	}

	public LigneDevis(int quantite, int remise, double totalHt, double totalTtc, double totalTaxe, Articles article, Devis devis) {
		super();
		this.quantite = quantite;
		this.remise = remise;
		this.totalHt = totalHt;
		this.totalTtc = totalTtc;
		this.totalTaxe = totalTaxe;
		this.article = article;
		this.devis = devis;
	}

	public int getQuantite() {
		return quantite;
	}

	public void setQuantite(int quantite) {
		this.quantite = quantite;
	}

	public int getRemise() {
		return remise;
	}

	public void setRemise(int remise) {
		this.remise = remise;
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

	public Articles getArticle() {
		return article;
	}

	public void setArticle(Articles article) {
		this.article = article;
	}

	public Devis getDevis() {
		return devis;
	}

	public void setDevis(Devis devis) {
		this.devis = devis;
	}
	

}
