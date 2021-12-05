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
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
@Table(name = "facture")
public class Facture {

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
	
	@Column(name = "timbre", nullable = false)
	private double timbre;
	
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
    @JoinColumn(name = "bonreception_id")
    private BonReception bonReception;	
	
    @OneToMany(cascade= CascadeType.ALL)
    @JoinColumn(name = "facture_id")
    @JsonManagedReference
	private List<LigneFacture> ligneFactures ;
    
    @OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "commande_id")
	private Commande commande;

    public Facture() {
		
   	}

	public Facture(String numero, Date date, double totalHt, double totalTtc, double totalTaxe, double remise,
			 double timbre, Etat etat, Fournisseur fournisseur, User user, BonReception bonReception, List<LigneFacture> ligneFactures, Commande commande) {
		super();
		this.numero = numero;
		this.date = date;
		this.totalHt = totalHt;
		this.totalTtc = totalTtc;
		this.totalTaxe = totalTaxe;
		this.remise = remise;
		this.timbre = timbre;
		this.etat = etat;
		this.fournisseur = fournisseur;
		this.user = user;
		this.bonReception = bonReception;
		this.ligneFactures = ligneFactures;
		this.commande = commande;
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

	public double getTimbre() {
		return timbre;
	}

	public void setTimbre(double timbre) {
		this.timbre = timbre;
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

	public BonReception getBonReception() {
		return bonReception;
	}

	public void setBonReception(BonReception bonReception) {
		this.bonReception = bonReception;
	}

	public List<LigneFacture> getLigneFactures() {
		return ligneFactures;
	}

	public void setLigneFactures(List<LigneFacture> ligneFactures) {
		this.ligneFactures = ligneFactures;
	}

	public Commande getCommande() {
		return commande;
	}

	public void setCommande(Commande commande) {
		this.commande = commande;
	}
	  
}
