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

@Entity
@Table(name = "stockMagasins")
public class StockMagasin {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
	
	@Column(name = "quantite", nullable = false)
    private int quantite;
	
	@Column(name = "dateReception", nullable = false)
	private Date dateReception ;
	
	@Column(name = "dateValidite", nullable = false)
	private Date dateValidite ;
	
	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "article_id")
	private Articles article;
	 
	@ManyToOne
	@JoinColumn(name = "magasin_id")
	private Magasin  magasin;


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


	public Date getDateReception() {
		return dateReception;
	}


	public void setDateReception(Date dateReception) {
		this.dateReception = dateReception;
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


	public Magasin getMagasin() {
		return magasin;
	}


	public void setMagasin(Magasin magasin) {
		this.magasin = magasin;
	}
	
    public StockMagasin() {
		
	}

	public StockMagasin(int quantite, Date dateReception, Date dateValidite, Articles article, Magasin magasin) {
		super();
		this.quantite = quantite;
		this.dateReception = dateReception;
		this.dateValidite = dateValidite;
		this.article = article;
		this.magasin = magasin;
	}

}
