package com.petroservcatering.model;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "typeArticle")
public class TypeArticle {

	public TypeArticle(long id, String code, String designation) {
		super();
		this.id = id;
		this.code = code;
		this.designation = designation;
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

	public String getDesignation() {
		return designation;
	}

	public void setDesignation(String designation) {
		this.designation = designation;
	}

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
	
	@Column(name = "code", nullable = false)
    private String code;
	
	@Column(name = "designation", nullable = false)
	private String designation ;
	
	public TypeArticle() {
		
	}
}