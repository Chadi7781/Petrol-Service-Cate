package com.petroservcatering.model;

import java.util.Date;
import java.util.List;

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
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
@Table(name = "bon_receptions")
public class BonReception {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
	
	@Column(name = "numero", nullable = false)
	private String numero;
	
	@Column(name = "date", nullable = false)
    private Date date;
	
	@Column(name = "totalHt", nullable = false)
	private double totalHt;
	
	@Column(name = "totalTtc", nullable = false)
	private double totalTtc;
	
	@Column(name = "totalTaxe", nullable = false)
	private double totalTaxe;
	
	@Column(name = "remise", nullable = false)
	private double remise;
	
	@ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "etat_id")
	private Etat etat;
	
	@ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "fournisseur_id")
    private Fournisseur fournisseur;	
	
	@ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    private User user;	
	
	@ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "magasin_id")
    private Magasin magasin;	
	
    @OneToMany(cascade= CascadeType.ALL)
    @JoinColumn(name = "bonreception_id")
    @JsonManagedReference
	private List<LigneReception> ligneReceptions ;

    public BonReception() {
		
   	}

    
	public BonReception(String numero, Date date, double totalHt, double totalTtc, double totalTaxe, double remise,
			Etat etat, Fournisseur fournisseur, User user, Magasin magasin, List<LigneReception> ligneReceptions) {
		super();
		this.numero = numero;
		this.date = date;
		this.totalHt = totalHt;
		this.totalTtc = totalTtc;
		this.totalTaxe = totalTaxe;
		this.remise = remise;
		this.etat = etat;
		this.fournisseur = fournisseur;
		this.user = user;
		this.magasin = magasin;
		this.ligneReceptions = ligneReceptions;
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

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Magasin getMagasin() {
		return magasin;
	}

	public void setMagasin(Magasin magasin) {
		this.magasin = magasin;
	}

	public List<LigneReception> getLigneReceptions() {
		return ligneReceptions;
	}

	public void setLigneReceptions(List<LigneReception> ligneReceptions) {
		this.ligneReceptions = ligneReceptions;
	}
    
    
}
