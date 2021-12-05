
import { BonReception } from '../../../core/models/bonReception/bonReception';
import { LigneReception } from '../../../core/models/bonReception/ligneReception';
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
import { BonReceptionService } from 'src/app/core/service/bonReception/bonReception.service';
import { Magasin } from 'src/app/core/Models/magasin/magasin';
import { TokenStorageService } from 'src/app/Core/service/user-auth/token-storage.service';
import { User } from 'src/app/core/models/user/userEntity';

@Component({
  selector: 'app-create-bonReception',
  templateUrl: './create-bonReception.component.html',
  styleUrls: ['./create-bonReception.component.css']
})
export class CreateBonReceptionComponent implements OnInit {

  bonReception: BonReception = new BonReception();
  submitted = false;
  isLoggedIn = false;
  idBonReception : number;
  public fournisseurs: Fournisseur[] = [];
  public articles: Article[] = [];
  public magasins: Magasin[] = [];
  public currentUser : User= new User();

  ligneReception: LigneReception= new LigneReception();
  public ligneDeReceptions: LigneReception[] = [];
  options: FormGroup;
  hideRequiredControl = new FormControl(false);
  floatLabelControl = new FormControl('auto');

  constructor(private bonReceptionService: BonReceptionService, private fournisseurService: FournisseurService,
     private tokenStorageService: TokenStorageService, private magasinService: MagasinService, private articleService: ArticleService, 
     private router: Router,private _snackBar: MatSnackBar) { 
  }
  ngOnInit() {
    this.getInitBonReception()
    this.getAllFournisseur();
    this.getAllArticle();
    this.getAllMagasin();

    this.newDynamic = {};
    this.ligneDeReceptions.push(this.newDynamic);
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
  getInitBonReception() {
      this.bonReceptionService.getInitBonReception().subscribe(res => {
        this.bonReception = res;
        this.currentUser.id=this.tokenStorageService.getUser().id;
        this.bonReception.user= this.currentUser;
        this.bonReception.date=  new Date(res.date.slice(0,10));
      });  
    }  
  newBonReception(): void {
    this.submitted = false;
    this.bonReception = new BonReception();
  }

  save() {

    this.bonReception.ligneReceptions = [];
    this.ligneDeReceptions.forEach(element => {
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
       this.bonReception.ligneReceptions.push(element);
    });
    
    this.bonReception.ligneReceptions=this.ligneDeReceptions;
    this.bonReceptionService.createBonReception(this.bonReception).subscribe(data => {    
    }, 
    error => console.log(error));
    this.gotoList(); 
  }

  onSubmit() {
    this.submitted = true;
    this.save(); 
  }

  gotoList() {
    this.router.navigate(['/bonReceptions']);
  }


  ligneBonReceptions: Array<LigneReception> = [];
  newDynamic: any = {};
 
  addRow() {  
    this.calculerBonReception();
      this.newDynamic = {};
      this.ligneDeReceptions.push(this.newDynamic);
      console.log(this.ligneDeReceptions);
      return true;
  }
  
  deleteRow(index) {
      if(this.ligneDeReceptions.length ==1) {
         this._snackBar.open("Vous ne pouvez pas supprimé la ligne quand il y a une seule ligne !",  'Warning', {
          duration: 2000,
        });
          return false;
      } else {
          this.ligneDeReceptions.splice(index, 1);
          this.calculerBonReception();
          return true;
      }
  }
  calculerBonReception(){
    if(this.ligneDeReceptions.length>0 && this.ligneDeReceptions[0].article!=null ){
      this.bonReception.totalHt= 0 ;
      this.bonReception.remise= 0 ;
      this.bonReception.totalTtc= 0 ;
      this.bonReception.totalTaxe= 0 ;
    this.ligneDeReceptions.forEach(element => {
      if(element.quantite>0 && element.article!=null){
      if(element.remise>0){
        this.bonReception.remise= this.bonReception.remise +  element.quantite * element.article.prix * element.remise /100 ;
        this.bonReception.totalHt=  this.bonReception.totalHt + element.quantite * element.article.prix * (100 - element.remise) /100 ;
        this.bonReception.totalTaxe= this.bonReception.totalTaxe + element.quantite * element.article.prix * (100 - element.remise) /100 * element.article.tva /100 ;
      } else {
        this.bonReception.totalHt=  this.bonReception.totalHt + element.quantite * element.article.prix ;
        this.bonReception.totalTaxe= this.bonReception.totalTaxe + element.quantite * element.article.prix * element.article.tva /100 ;
      }
      this.bonReception.totalTtc=  this.bonReception.totalHt +  this.bonReception.totalTaxe ;
      } 
    });
   }
  }
}