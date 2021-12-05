package com.petroservcatering.model;

import java.util.Date;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import com.fasterxml.jackson.annotation.JsonFormat;


@Entity
@Table(name= "taxe")

public class Taxe {
	
	@Id
	@GeneratedValue(strategy= GenerationType.IDENTITY)
	@Column(name= "id")
	private long id;
	
	@Column(name= "taux")
	private double taux;
 
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
	@Column(name= "dateDebut")
	private Date dateDebut;
	
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
	@Column(name= "dateFin")
	private Date dateFin;		
	
	@Column(name= "type")
	private String type;
	
	@Column(name= "sens")
	private String sens;
	
	public Taxe() {
		
	}
	
	public Taxe(long id, String type,String sens,double taux ,Date dateDebut, Date dateFin,List<Articles> articles) {
		super();
		this.id = id;
		this.type = type;
		this.sens=sens;
		this.taux = taux;
		this.dateDebut = dateDebut;
		this.dateFin = dateFin;
	}
	
	
	public String getSens() {
		return sens;
	}

	public void setSens(String sens) {
		this.sens = sens;
	}

	public Taxe(double taux,String type, Date dateDebut, Date dateFin) {
		super();
		this.taux = taux;
		this.dateDebut = dateDebut;
		this.dateFin = dateFin;
		this.type = type;

	}

	public long getId() {
		return id;
	}
	
	public void setId(long id) {
		this.id = id;
	}
	
	public double getTaux() {
		return taux;
	}
	
	public void setTaux(double taux) {
		this.taux = taux;
	}
	public Date getDateDebut() {
		return dateDebut;
	}
	
	public void setDateDebut(Date dateDebut) {
		this.dateDebut = dateDebut;
	}
	
	public Date getDateFin() {
		return dateFin;
	}
	public void setDateFin(Date dateFin) {
		this.dateFin = dateFin;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}
	
}
