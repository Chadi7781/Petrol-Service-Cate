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
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
@Table(name = "devis")
public class Devis {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
	
	@Column(name = "numero", nullable = false)
	private String numero;
	
	@Column(name = "date", nullable = false)
	//@DateTimeFormat(pattern="yyyy-MM-dd")
	@JsonFormat(pattern = "yyyy-MM-dd" )
	private Date date;
	
	@Column(name = "totalHt", nullable = false)
	private double totalHt;
	
	@Column(name = "totalTtc", nullable = false)
	private double totalTtc;
	
	@Column(name = "totalTaxe", nullable = false)
	private double totalTaxe;
	
	@Column(name = "remise", nullable = false)
	private double remise;
	
	@Column(name = "marge", nullable = false)
	private double marge;
	
	@ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "etat_id")
	private Etat etat;
	
	@ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "fournisseur_id")
	private Fournisseur fournisseur;
	
	@ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
	private User user;
	
	@OneToMany(cascade= CascadeType.ALL)
    @JoinColumn(name = "devis_id")
    @JsonManagedReference
	private List<LigneDevis> ligneDevisList;
	
	public Devis() {
		
	}

	public Devis(String numero, Date date, double totalHt, double totalTtc, double totalTaxe, double remise, double marge,
			Etat etat, Fournisseur fournisseur, User user, List<LigneDevis> ligneDevisList) {
		super();
		this.numero = numero;
		this.date = date;
		this.totalHt = totalHt;
		this.totalTtc = totalTtc;
		this.totalTaxe = totalTaxe;
		this.remise = remise;
		this.marge = marge;
		this.etat = etat;
		this.fournisseur = fournisseur;
		this.user = user;
		this.ligneDevisList = ligneDevisList;
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

	public double getMarge() {
		return marge;
	}

	public void setMarge(double marge) {
		this.marge = marge;
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

	public List<LigneDevis> getLigneDevisList() {
		return ligneDevisList;
	}

	public void setLigneDevisList(List<LigneDevis> ligneDevisList) {
		this.ligneDevisList = ligneDevisList;
	}
	
	
	

}
