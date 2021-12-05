package com.petroservcatering.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "client")
public class Client {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
	
	@Column(name = "code", nullable = false)
    private String code;
	
	@Column(name = "name", nullable = false)
	private String name ;
	
	@Column(name = "adresse", nullable = false)
	private String adresse ;
	
	@Column(name = "tel", nullable = false)
	private String tel ;
	
	@Column(name = "fax", nullable = false)
	private String fax ;
	
	@Column(name = "mail", nullable = false)
	private String mail ;
	
	@ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "devise_id")
	private Devise devise;
	
	public Client(long id, String code, String name, String adresse, String tel, String fax, String mail, Devise devise,
			String matriculefiscale, String registrecommerce, String patente, long solde_initial) {
		super();
		this.id = id;
		this.code = code;
		this.name = name;
		this.adresse = adresse;
		this.tel = tel;
		this.fax = fax;
		this.mail = mail;
		this.devise = devise;
		this.matriculefiscale = matriculefiscale;
		this.registrecommerce = registrecommerce;
		this.patente = patente;
		this.solde_initial = solde_initial;
	}



	public long getId() {
		return id;
	}



	public void setId(long id) {
		this.id = id;
	}



	public String getCode() {
		return code;
	}



	public void setCode(String code) {
		this.code = code;
	}



	public String getName() {
		return name;
	}



	public void setName(String name) {
		this.name = name;
	}



	public String getAdresse() {
		return adresse;
	}



	public void setAdresse(String adresse) {
		this.adresse = adresse;
	}



	public String getTel() {
		return tel;
	}



	public void setTel(String tel) {
		this.tel = tel;
	}



	public String getFax() {
		return fax;
	}



	public void setFax(String fax) {
		this.fax = fax;
	}



	public String getMail() {
		return mail;
	}



	public void setMail(String mail) {
		this.mail = mail;
	}



	public Devise getDevise() {
		return devise;
	}



	public void setDevise(Devise devise) {
		this.devise = devise;
	}



	public String getMatriculefiscale() {
		return matriculefiscale;
	}



	public void setMatriculefiscale(String matriculefiscale) {
		this.matriculefiscale = matriculefiscale;
	}



	public String getRegistrecommerce() {
		return registrecommerce;
	}



	public void setRegistrecommerce(String registrecommerce) {
		this.registrecommerce = registrecommerce;
	}



	public String getPatente() {
		return patente;
	}



	public void setPatente(String patente) {
		this.patente = patente;
	}



	public long getSolde_initial() {
		return solde_initial;
	}



	public void setSolde_initial(long solde_initial) {
		this.solde_initial = solde_initial;
	}



	@Column(name = "matriculefiscale", nullable = false)
	private String matriculefiscale ;
	
	@Column(name = "registrecommerce", nullable = false)
	private String registrecommerce ;
	
	@Column(name = "patente", nullable = false)
	private String patente ;
	
	@Column(name = "solde_initial", nullable = false)
	private long solde_initial ;
	

	
	public Client() {
		
	}
	
	
}
