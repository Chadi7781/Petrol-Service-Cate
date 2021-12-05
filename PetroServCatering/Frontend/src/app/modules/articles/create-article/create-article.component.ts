
import { ArticleService } from "../../../core/service/article/article.service";
import { Article } from '../../../core/models/article/article';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { Edestination } from "src/app/core/models/edestination";
import { Edurabilite } from "src/app/core/models/edurabilite";
import { Famille } from "src/app/core/Models/famille/famille";
import { FamilleService } from "src/app/core/service/famille/famille.service";
import { ViewChild } from "@angular/core";
import { ElementRef } from "@angular/core";
import { SousFamille } from "src/app/core/Models/famille/sousfamille";
import { SousFamilleService } from "src/app/core/service/famille/sousFamille.service";
import { CategorieService } from "src/app/core/service/categorie/categorie.service";
import { TypeArticleService } from "src/app/core/service/typeArticle/typeArticle.service";
import { TaxeService } from "src/app/core/service/taxe/taxe.service";
import { ConfirmationDialog } from "../../employee/employee-list/confirmation-dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";


@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.css']
})
export class CreateArticleComponent implements OnInit {

  article: Article = new Article();
  submitted = false;


  familleid : number;
  familleslist = [];
  sousfamilleslist = [];
  sousFamillesFamille = [];
  idf : number ;
  options: FormGroup;

famillesObject : Object


  //Destination list item
  distinations = [];
  edistantion = Edestination;

  //Durabilite list  item
  durabilites = [];
  edurabilite = Edurabilite;

  //Categorie
  categories = [];

  //Types Articles
  typesArticles = [];
  //taxe 
  taxes = [];

  hideRequiredControl = new FormControl(false);
  floatLabelControl = new FormControl('auto');

 


  initEnumList() {
    this.distinations=Object.keys(this.edistantion);
    this.durabilites = Object.keys(this.edurabilite);
  }

  getAllCategories() {
     
    this.categoriesService.getCategoriesList().subscribe(res=>{
      this.categories= res ;
    })
  }


  getAllTypesArticles() {
     
    this.typesArticlesService.getTypeArticlesList().subscribe(res=>{
      this.typesArticles= res ;
    })
  }
  
  
  getAllFamilles(){
    
    this.familleService.getFamillesList().subscribe(res=>{
      this.familleslist= res ;
    })
  }

  getAllTaxes() {
    this.taxeService.getAllTaxes().subscribe(res => {
      this.taxes = res;
    })
  }

  someMethod(value){
    let arr = [];  
Object.keys(value).map(function(key){  
    arr.push({[key]:value[key]})  
    return arr;  
});
arr.forEach(element => {
  this.sousFamillesFamille = element.sousFamilles;
});


  return this.sousFamillesFamille;
  }
 


 







    

  


   
  constructor(private articleService: ArticleService,
    private categoriesService : CategorieService,
    private familleService : FamilleService, 
    private sousFamillesS : SousFamilleService,
     private typesArticlesService: TypeArticleService,
    private taxeService :TaxeService,
    private router: Router, 
    private route : ActivatedRoute,
   private dialog: MatDialog,
   private snackBar: MatSnackBar) { 
     
      this.initEnumList();
    }




  ngOnInit() {
    this.getAllFamilles();
    this.getAllCategories();
    this.getAllTypesArticles();
    this.getAllTaxes();
  }

  newArticle(): void {
    this.submitted = false;
    this.article = new Article();
  }

  save() {
    
    
    this.articleService
    .createArticle(this.article).subscribe(data => {
      console.log(data);
    
      this.article = new Article();
      this.gotoList();
    }, 
    error => console.log(error));
  }

  onSubmit() {

    if(!this.sousFamillesFamille.length || !this.article.sousFamille){
      alert("cette famille n'admet pas des sous familles ");
      return;
    }
    this.submitted = true;
  
    this.save();    
  }

  gotoList() {
    this.router.navigate(['/articles']);
  }

}