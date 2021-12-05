
package com.petroservcatering.model;

import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = "etats")
@Data
public class Etat {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private Eetat name;
    
    
    
    
    public Etat() {

    }

    public Etat(Eetat name) {
        this.name = name;
    }

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Eetat getName() {
		return name;
	}

	public void setName(Eetat name) {
		this.name = name;
	}
}