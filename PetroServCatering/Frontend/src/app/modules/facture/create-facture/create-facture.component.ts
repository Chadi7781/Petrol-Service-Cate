
import { Facture } from '../../../core/models/facture/facture';
import { LigneFacture } from '../../../core/models/facture/ligneFacture';
import { Article } from '../../../core/models/article/article';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FournisseurService } from "../../../core/service/fournisseur/fournisseur.service";
import { ArticleService } from "../../../core/service/article/article.service";
import { MagasinService } from "../../../core/service/magasin/magasin.service";
import { Fournisseur } from '../../../core/models/fournisseur/fournisseur';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FactureService } from 'src/app/core/service/facture/facture.service';
import { Magasin } from 'src/app/core/Models/magasin/magasin';
import { TokenStorageService } from 'src/app/Core/service/user-auth/token-storage.service';
import { User } from 'src/app/core/models/user/userEntity';

@Component({
  selector: 'app-create-facture',
  templateUrl: './create-facture.component.html',
  styleUrls: ['./create-facture.component.css']
})
export class CreateFactureComponent implements OnInit {

  facture: Facture = new Facture();
  submitted = false;
  isLoggedIn = false;
  idFacture : number;
  public fournisseurs: Fournisseur[] = [];
  public articles: Article[] = [];
  public magasins: Magasin[] = [];
  public currentUser : User= new User();

  ligneFacture: LigneFacture= new LigneFacture();
  public ligneDeFactures : LigneFacture[] = [];
  options: FormGroup;
  hideRequiredControl = new FormControl(false);
  floatLabelControl = new FormControl('auto');

  constructor(private factureService: FactureService, private fournisseurService: FournisseurService,
     private tokenStorageService: TokenStorageService, private magasinService: MagasinService, private articleService: ArticleService, 
     private router: Router,private _snackBar: MatSnackBar) { 
  }
  ngOnInit() {
    this.getInitFacture()
    this.getAllFournisseur();
    this.getAllArticle();
    this.getAllMagasin();

    this.newDynamic = {};
    this.ligneDeFactures.push(this.newDynamic);
  }
  getAllMagasin() {
    this.magasinService.getMagasinsList().subscribe(res => {
      this.magasins = res;
    });  
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
  getInitFacture() {
      this.factureService.getInitFacture().subscribe(res => {
        this.facture = res;
        this.currentUser.id=this.tokenStorageService.getUser().id;
        this.facture.user= this.currentUser;
        this.facture.date=  new Date(res.date.slice(0,10));
        this.facture.timbre = 600;
      });  
    }  
  newFacture(): void {
    this.submitted = false;
    this.facture = new Facture();
  }

  save() {

    this.facture.ligneFactures = [];
    this.ligneDeFactures.forEach(element => {
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
       this.facture.ligneFactures.push(element);
    });
    
    this.facture.ligneFactures=this.ligneDeFactures;
    this.factureService.createFacture(this.facture).subscribe(data => {    
      this.gotoList(); 

    }, 
    error => console.log(error));
  }

  onSubmit() {
    this.submitted = true;
    this.save(); 
  }

  gotoList() {
    this.router.navigate(['/factures']);
  }


  ligneFactures: Array<LigneFacture> = [];
  newDynamic: any = {};
 
  addRow() {  
    this.calculerFacture();
      this.newDynamic = {};
      this.ligneDeFactures.push(this.newDynamic);
      console.log(this.ligneDeFactures);
      return true;
  }
  
  deleteRow(index) {
      if(this.ligneDeFactures.length ==1) {
         this._snackBar.open("Vous ne pouvez pas supprimé la ligne quand il y a une seule ligne !",  'Warning', {
          duration: 2000,
        });
          return false;
      } else {
          this.ligneDeFactures.splice(index, 1);
          this.calculerFacture();
          this._snackBar.open('Row deleted successfully', 'Delete row');
          return true;
      }
  }
  calculerFacture(){
    if(this.ligneDeFactures.length>0 && this.ligneDeFactures[0].article!=null ){
      this.facture.totalHt= 0 ;
      this.facture.remise= 0 ;
      this.facture.totalTtc= 0 ;
      this.facture.totalTaxe= 0 ;
    this.ligneDeFactures.forEach(element => {
      if(element.quantite>0 && element.article!=null){
        if(element.remise>0){
          this.facture.remise= this.facture.remise +  element.quantite * element.article.prix * element.remise /100 ;
          this.facture.totalHt=  this.facture.totalHt + element.quantite * element.article.prix * (100 - element.remise) /100 ;
          this.facture.totalTaxe= this.facture.totalTaxe + element.quantite * element.article.prix * (100 - element.remise) /100 * element.article.tva /100 ;
        } else {
          this.facture.totalHt=  this.facture.totalHt + element.quantite * element.article.prix ;
          this.facture.totalTaxe= this.facture.totalTaxe + element.quantite * element.article.prix * element.article.tva /100 ;
        }
      this.facture.totalTtc=  this.facture.totalHt +  this.facture.totalTaxe +  this.facture.timbre ;
      } 
    });
   }
  }
}