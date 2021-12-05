package com.petroservcatering.model;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

@Entity
@Table(name = "famille")
@JsonIdentityInfo(
		  generator = ObjectIdGenerators.PropertyGenerator.class, 
		  property = "id")
public class Famille {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
	
	@Column(name = "code", nullable = false)
    private String code;
	
	@Column(name = "name", nullable = false)
	private String name ;
	
	@OneToMany(cascade= CascadeType.ALL)
	

	
    @JoinColumn(name = "famille_id")
	private List<SousFamille> sousFamilles ;
	
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

	public List<SousFamille> getSousFamilles() {
		return sousFamilles;
	}

	public void setSousFamilles(List<SousFamille> sousFamilles) {
		this.sousFamilles = sousFamilles;
	}

	public Famille() {
		
	}
	
}
