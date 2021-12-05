package com.petroservcatering.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;


@Entity
@Table(name = "fournisseurs")
public class Fournisseur {
	private long id;
	private String numero;
	private String raisonSociale;
	private String adresse ;
	private String tel;
	private String email;
	private Date date;
	private String matriculeFiscale;
	
	public Fournisseur() {
		
	}

	public Fournisseur(String numero, String raisonSociale, String adresse, String tel,String email, Date date,
			String matriculeFiscale) {
		super();
		this.numero = numero;
		this.raisonSociale = raisonSociale;
		this.adresse = adresse;
		this.tel = tel;
        this.email =email;
		this.date = date;
		this.matriculeFiscale = matriculeFiscale;
	}
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	
	@Column(name = "numero", nullable = false)
	public String getNumero() {
		return numero;
	}
	public void setNumero(String numero) {
		this.numero = numero;
	}
	
	@Column(name = "raisonSociale", nullable = false)
	public String getRaisonSociale() {
		return raisonSociale;
	}
	public void setRaisonSociale(String raisonSociale) {
		this.raisonSociale = raisonSociale;
	}
	
	@Column(name = "adresse", nullable = false)
	public String getAdresse() {
		return adresse;
	}
	public void setAdresse(String adresse) {
		this.adresse = adresse;
	}
	
	@Column(name = "email", nullable = false)
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	
	@Column(name = "tel", nullable = false)
	public String getTel() {
		return tel;
	}
	public void setTel(String tel) {
		this.tel = tel;
	}
	
	@Column(name = "date", nullable = false)
	public Date getDate() {
		return date;
	}
	public void setDate(Date date) {
		this.date = date;
	}
	
	@Column(name = "matriculeFiscale", nullable = false)
	public String getMatriculeFiscale() {
		return matriculeFiscale;
	}
	public void setMatriculeFiscale(String matriculeFiscale) {
		this.matriculeFiscale = matriculeFiscale;
	}

	@Override
	public String toString() {
		return "Fournisseur [id=" + id + ", numero=" + numero + ", raisonSociale=" + raisonSociale + ", adresse="
				+ adresse + ", tel=" + tel + ", email=" + email + ", date=" + date + ", matriculeFiscale="
				+ matriculeFiscale + "]";
	}
	
	
}
