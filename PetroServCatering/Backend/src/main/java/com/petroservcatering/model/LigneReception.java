package com.petroservcatering.model;

import java.util.Date;

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
@Table(name = "ligneReceptions")
public class LigneReception {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
	
	@Column(name = "quantite", nullable = false)
    private int quantite;
	
	@Column(name = "remise")
    private int remise;
	
	@Column(name = "tva", nullable = false)
	private int tva ;
	
	@Column(name = "totalHt", nullable = false)
	private double totalHt;
	
	@Column(name = "totalTtc", nullable = false)
	private double totalTtc;
	
	@Column(name = "totalTaxe", nullable = false)
	private double totalTaxe;
	
	@Column(name = "dateFabrication")
	private Date dateFabrication;
	
	@Column(name = "dateValidite")
	private Date dateValidite;

	 @OneToOne(fetch = FetchType.LAZY)
	 @JoinColumn(name = "article_id")
	 private Articles article;
	 
	 @ManyToOne
	 @JoinColumn(name = "bonreception_id")
	 @JsonBackReference
	 private BonReception bonreception;

	public LigneReception() {
		
	}
	 
	public LigneReception( int quantite, int remise, int tva, double totalHt, double totalTtc,
			double totalTaxe,Date dateFabrication, Date dateValidite,
			Articles article, BonReception bonreception) {
		super();
		this.quantite = quantite;
		this.remise = remise;
		this.tva = tva;
		this.totalHt = totalHt;
		this.totalTtc = totalTtc;
		this.totalTaxe = totalTaxe;
		this.dateFabrication = dateFabrication;
		this.dateValidite = dateValidite;
		this.article = article;
		this.bonreception = bonreception;
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

	public int getRemise() {
		return remise;
	}

	public void setRemise(int remise) {
		this.remise = remise;
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

	public Date getDateFabrication() {
		return dateFabrication;
	}

	public void setDateFabrication(Date dateFabrication) {
		this.dateFabrication = dateFabrication;
	}

	public Date getDateValidite() {
		return dateValidite;
	}

	public void setDateValidite(Date dateValidite) {
		this.dateValidite = dateValidite;
	}

	public Articles getArticle() {
		return article;
	}

	public void setArticle(Articles article) {
		this.article = article;
	}

	public BonReception getBonreception() {
		return bonreception;
	}

	public void setBonreception(BonReception bonreception) {
		this.bonreception = bonreception;
	}
	 
	 

}
