
import { Facture } from '../../../core/models/facture/facture';
import { LigneFacture } from '../../../core/models/facture/ligneFacture';
import { Article } from '../../../core/models/article/article';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FournisseurService } from "../../../core/service/fournisseur/fournisseur.service";
import { ArticleService } from "../../../core/service/article/article.service";
import { Fournisseur } from '../../../core/models/fournisseur/fournisseur';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTableDataSource} from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FactureService } from 'src/app/core/service/facture/facture.service';
import { LigneFactureService } from 'src/app/core/service/facture/ligneFacture.service';




@Component({
  selector: 'app-update-facture',
  templateUrl: './update-facture.component.html',
  styleUrls: ['./update-facture.component.css']
})
export class UpdateFactureComponent implements OnInit {

  id: number;
  facture: Facture ;
  submitted = false;
  idFacture : number;
  public fournisseurs: Fournisseur[] = [];
  public articles: Article[] = [];
  ligneFacture: LigneFacture= new LigneFacture();
  public ligneDeFactures: LigneFacture[] = [];
  options: FormGroup;
  hideRequiredControl = new FormControl(false);
  floatLabelControl = new FormControl('auto');

  constructor(private factureService: FactureService, private   ligneFactureService: LigneFactureService, private fournisseurService: FournisseurService,
    private articleService: ArticleService, private router: Router,private _snackBar: MatSnackBar,private route: ActivatedRoute,) { 
  }
  ngOnInit() {
    this.getAllFournisseur();
    this.getAllArticle();
    this.id = this.route.snapshot.params['id'];
    this.factureService.getFacture(this.id)
    .subscribe(data => {
      console.log(data)
      this.facture = data;
      this.facture.date= new Date(data.date.slice(0,10));
     // this.facture.fournisseur = data.fournisseur;

      console.log(this.facture.fournisseur)

    }, error => console.log(error));       

    this.newDynamic = {};
    this.ligneFactures.push(this.newDynamic);
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
 
  newFacture(): void {
    this.submitted = false;
    this.facture = new Facture();
  }

  save() {

    this.facture.ligneFactures = [];
    this.ligneFactures.forEach(element => {
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
    this.facture.ligneFactures=this.ligneFactures;
    this.factureService.createFacture(this.facture).subscribe(data => {    
    }, 
    error => console.log(error));
    this.gotoList(); 
  }

  onSubmit() {
    this.facture = new Facture();

    this.id = this.route.snapshot.params['id'];
    
    this.factureService.getFacture(this.id)
      .subscribe(data => {
        console.log(data)
        this.facture = data;
      }, error => console.log(error));  
    this.submitted = true;
    this.updateFacture();    

  }

  updateFacture() {
    this.factureService.updateFacture(this.id, this.facture)
      .subscribe(data => {
        console.log(data);
        this.facture = new Facture();
        this.gotoList();
      }, error => console.log(error));
  }



  gotoList() {
    this.router.navigate(['/factures']);
  }


  ligneFactures: Array<LigneFacture> = [];
  newDynamic: any = {};
 
  addRow() {  
    this.calculerFacture();
      this.newDynamic = {};
      this.ligneFactures.push(this.newDynamic);
      console.log(this.ligneFactures);
      return true;
  }
  
  deleteRow(index) {
    this.calculerFacture();
      if(this.ligneFactures.length ==1) {
         this._snackBar.open("Vous ne pouvez pas supprimé la ligne quand il y a une seule ligne !",  'Warning', {
          duration: 2000,
        });
          return false;
      } else {
          this.ligneFactures.splice(index, 1);
        //  this.toastr.warning('Row deleted successfully', 'Delete row');
          return true;
      }
  }
  calculerFacture(){
    if(this.ligneFactures.length>0 && this.ligneFactures[0].article!=null ){
      this.facture.totalHt= 0 ;
      this.facture.remise= 0 ;
      this.facture.totalTtc= 0 ;
      this.facture.totalTaxe= 0 ;
    this.ligneFactures.forEach(element => {
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


















  