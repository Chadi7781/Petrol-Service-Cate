package com.petroservcatering.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "devise")
public class Devise {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
	
	@Column(name = "name", nullable = false)
	private String name ;
	
	@Column(name = "taux", nullable = false)
    private String taux;

	
	public Devise() {
		
	}
	
	public Devise(long id, String name, String taux) {
		super();
		this.id = id;
		this.name = name;
		this.taux = taux;
	}

	public long getId() {
		return id;
	}


	public void setId(long id) {
		this.id = id;
	}


	public String getName() {
		return name;
	}


	public void setName(String name) {
		this.name = name;
	}


	public String getTaux() {
		return taux;
	}


	public void setTaux(String taux) {
		this.taux = taux;
	}


	
}
