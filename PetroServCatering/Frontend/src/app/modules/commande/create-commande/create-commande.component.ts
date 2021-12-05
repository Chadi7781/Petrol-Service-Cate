
import { CommandeService } from "../../../core/service/commande/commande.service";
import { Commande } from '../../../core/models/commande/commande';
import { LigneCommande } from '../../../core/models/commande/ligneCommande';
import { Article } from '../../../core/models/article/article';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FournisseurService } from "../../../core/service/fournisseur/fournisseur.service";
import { ArticleService } from "../../../core/service/article/article.service";
import { Fournisseur } from '../../../core/models/fournisseur/fournisseur';
import { FormControl, FormGroup} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-create-commande',
  templateUrl: './create-commande.component.html',
  styleUrls: ['./create-commande.component.css']
})
export class CreateCommandeComponent implements OnInit {

  commande: Commande = new Commande();
  submitted = false;
  idCommande : number;
  public fournisseurs: Fournisseur[] = [];
  public articles: Article[] = [];
  ligneCommande: LigneCommande= new LigneCommande();
  public ligneDeCommandes: LigneCommande[] = [];
  options: FormGroup;
  hideRequiredControl = new FormControl(false);
  floatLabelControl = new FormControl('auto');

  constructor(
    private commandeService: CommandeService, 
    private fournisseurService: FournisseurService,
    private articleService: ArticleService, 
    private router: Router,
    private _snackBar: MatSnackBar
    ) {}

  ngOnInit() {
    this.getInitCommande()
    this.getAllFournisseur();
    this.getAllArticle();

    this.newDynamic = {};
    this.ligneCommandes.push(this.newDynamic);
  }
 

  getAllFournisseur() {
    this.fournisseurService.getFournisseursList().subscribe(res => {
      this.fournisseurs = res;
    });  
    }  

  getAllArticle() {
      this.articleService.getArticlesList().subscribe(res => {
        this.articles = res;
      });  
    }  
  getInitCommande() {
      this.commandeService.getInitCommande().subscribe(res => {
        this.commande = res;
        this.commande.date=  new Date(res.date.slice(0,10));
      });  
    }  
  newCommande(): void {
    this.submitted = false;
    this.commande = new Commande();
  }

  save() {
    this.commande.ligneCommandes = [];
    this.ligneCommandes.forEach(element => {
       element.tva=element.article.tva;
       if(element.remise>0){
        element.totalTaxe=element.quantite * element.article.prix * (100- element.remise)/100 * element.article.tva /100;
        element.totalHt=element.quantite * element.article.prix * (100- element.remise)/100 ;
        element.totalTtc=element.totalHt+element.totalTaxe;
       }else{
        element.totalTaxe=element.quantite * element.article.prix * element.article.tva /100;
        element.totalHt=element.quantite * element.article.prix ;
        element.totalTtc=element.totalHt+element.totalTaxe;
       }     
       this.commande.ligneCommandes.push(element);
    });
    this.commande.ligneCommandes=this.ligneCommandes;
    this.commandeService.createCommande(this.commande).subscribe(data => {  
      this.gotoList(); 
  
    }, 
    error => console.log(error));
  }

  onSubmit() {
    this.submitted = true;
    this.save(); 
  }


  



  //Refresh after add command
 
  gotoList() {
    this.router.navigate(['/commandes'])
 

  }

  ligneCommandes: Array<LigneCommande> = [];
  newDynamic: any = {};
 
  addRow() {  
    this.calculerCommande();
      this.newDynamic = {};
      this.ligneCommandes.push(this.newDynamic);
      console.log(this.ligneCommandes);
      return true;
  }
  
  deleteRow(index) {
      if(this.ligneCommandes.length ==1) {
         this._snackBar.open("Vous ne pouvez pas supprimé la ligne quand il y a une seule ligne !",  'Warning', {
          duration: 2000,
        });
          return false;
      } else {
          this.ligneCommandes.splice(index, 1);
          this.calculerCommande();
          return true;
      }
  }
  calculerCommande(){
    if(this.ligneCommandes.length>0 && this.ligneCommandes[0].article!=null ){
      this.commande.totalHt= 0 ;
      this.commande.remise= 0 ;
      this.commande.totalTtc= 0 ;
      this.commande.totalTaxe= 0 ;
    this.ligneCommandes.forEach(element => {
      if(element.quantite>0 && element.article!=null){
      if(element.remise>0){
        this.commande.remise= this.commande.remise +  element.quantite * element.article.prix * element.remise /100 ;
        this.commande.totalHt=  this.commande.totalHt + element.quantite * element.article.prix * (100 - element.remise) /100 ;
        this.commande.totalTaxe= this.commande.totalTaxe + element.quantite * element.article.prix * (100 - element.remise) /100 * element.article.tva /100 ;
      } else {
        this.commande.totalHt=  this.commande.totalHt + element.quantite * element.article.prix ;
        this.commande.totalTaxe= this.commande.totalTaxe + element.quantite * element.article.prix * element.article.tva /100 ;
      }
      this.commande.totalTtc=  this.commande.totalHt +  this.commande.totalTaxe ;
      } 
    });
   }
  }
}