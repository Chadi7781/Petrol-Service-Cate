package com.petroservcatering.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name = "magasin")
public class Magasin {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
	
	@Column(name = "designation", nullable = false)
    private String designation;
	
	@Column(name = "adresse", nullable = false)
	private String adresse ;
	
	@Column(name = "tel", nullable = false)
	private String tel;
	
	@Column(name = "fax", nullable = false)
	private String fax;
	
	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "employee_id")
	private Employee responsable;
	
	public Magasin() {
		
	}

	public Magasin(String designation, String adresse, String tel, String fax, Employee responsable) {
		super();
		this.designation = designation;
		this.adresse = adresse;
		this.tel = tel;
		this.fax = fax;
		this.responsable = responsable;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getDesignation() {
		return designation;
	}

	public void setDesignation(String designation) {
		this.designation = designation;
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

	public Employee getResponsable() {
		return responsable;
	}

	public void setResponsable(Employee responsable) {
		this.responsable = responsable;
	}
	
}
