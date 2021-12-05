
package com.petroservcatering.model;

import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

@Entity
@Table(name = "articles")
@JsonIdentityInfo(
		  generator = ObjectIdGenerators.PropertyGenerator.class, 
		  property = "id")
public class Articles {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
	private String reference;
	private String name;
	private Double prix;
	private int tva;
	private String unite;
	
	private int marge;
	
   @ManyToMany(fetch = FetchType.LAZY)
   @JoinTable(	name = "article_taxes",
            joinColumns = @JoinColumn(name = "article_id"),
            inverseJoinColumns = @JoinColumn(name = "taxe_id"))
   @JsonFormat(with = JsonFormat.Feature.ACCEPT_SINGLE_VALUE_AS_ARRAY)

   private List<Taxe> taxes ;
    
   @ManyToOne(fetch = FetchType.EAGER)
   @JoinColumn(name = "categorie_id")
   private Categorie categorie; 
   
   @ManyToOne(fetch = FetchType.EAGER)
   @JoinColumn(name = "famille_id")
   
   private Famille famille; 
   
   @ManyToOne(fetch = FetchType.EAGER)
   @JsonIgnore
   @JoinColumn(name = "sous_famille_id")
   private SousFamille sousFamille;
   
   @ManyToOne(fetch = FetchType.EAGER)
   @JoinColumn(name = "type_article_id")
   private TypeArticle typeArticle;
    
    @Enumerated(EnumType.STRING)
    private Edurabilite durabilite;
    
    @Enumerated(EnumType.STRING)
    private Edestination destination;
    
	public Articles() {
		
	}
	
	public Articles(long id, Categorie categorie ,String reference, String name, Double prix, int tva, String unite,
			int marge,Edurabilite durabilite, Edestination destination, List<Taxe> taxes,TypeArticle typeArticle, Famille famille,SousFamille sousFamille) {
		super();
		this.id = id;
		this.reference = reference;
		this.name = name;
		this.prix = prix;
		this.tva = tva;
		this.unite = unite;
		this.marge = marge;
		this.durabilite = durabilite;
		this.destination = destination;
		this.famille = famille;
		this.sousFamille = sousFamille;
		this.categorie = categorie;
		this.taxes = taxes;
		this.typeArticle = typeArticle;
	}

	public Edurabilite getDurabilite() {
		return durabilite;
	}

	public void setDurabilite(Edurabilite durabilite) {
		this.durabilite = durabilite;
	}

	public Edestination getDestination() {
		return destination;
	}

	public void setDestination(Edestination destination) {
		this.destination = destination;
	}

	public int getMarge() {
		return marge;
	}

	public void setMarge(int marge) {
		this.marge = marge;
	}

	public Famille getFamille() {
		return famille;
	}

	public void setFamille(Famille famille) {
		this.famille = famille;
	}

	public SousFamille getSousFamille() {
		return sousFamille;
	}

	public void setSousFamille(SousFamille sousFamille) {
		this.sousFamille = sousFamille;
	}

	public TypeArticle getTypeArticle() {
		return typeArticle;
	}

	public void setTypeArticle(TypeArticle typeArticle) {
		this.typeArticle = typeArticle;
	}

	public List<Taxe> getTaxes() {
		return taxes;
	}

	public void setTaxes(List<Taxe> taxes) {
		this.taxes = taxes;
	}

	public Categorie getCategorie() {
		return categorie;
	}


	public void setCategorie(Categorie categorie_id) {
		this.categorie = categorie_id;
	}


	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	@Column(name = "reference", nullable = false)
	public String getReference() {
		return reference;
	}

	public void setReference(String reference) {
		this.reference = reference;
	}
	
	@Column(name = "name", nullable = false)
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	@Column(name = "prix", nullable = false)
	public Double getPrix() {
		return prix;
	}

	public void setPrix(Double prix) {
		this.prix = prix;
	}

	@Column(name = "tva", nullable = false)
	public int getTva() {
		return tva;
	}

	public void setTva(int tva) {
		this.tva = tva;
	}

	@Column(name = "unite", nullable = false)
	public String getUnite() {
		return unite;
	}

	public void setUnite(String unite) {
		this.unite = unite;
	}


	@Override
	public String toString() {
		return "Articles [reference=" + reference + ", name=" + name + ", prix=" + prix + ", tva=" + tva + ", unite="
				+ unite + ", marge=" + marge + ", durabilite=" + durabilite + ", destination=" + destination
				+ ", taxes=" + taxes + ", categorie=" + categorie + ", famille=" + famille + ", sousFamille="
				+ sousFamille + ", typeArticle=" + typeArticle + ", eDurabilite=" + ", eDestination="  + "]";
	}
	
}
