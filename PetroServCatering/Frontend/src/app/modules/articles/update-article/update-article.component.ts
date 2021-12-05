import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from "../../../core/service/article/article.service";
import { Article } from '../../../core/models/article/article';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import { Edestination } from 'src/app/core/models/edestination';
import { Edurabilite } from 'src/app/core/models/edurabilite';
import { FamilleService } from 'src/app/core/service/famille/famille.service';
import { CategorieService } from 'src/app/core/service/categorie/categorie.service';
import { SousFamilleService } from 'src/app/core/service/famille/sousFamille.service';
import { TaxeService } from 'src/app/core/service/taxe/taxe.service';
import { TypeArticleService } from 'src/app/core/service/typeArticle/typeArticle.service';


@Component({
  selector: 'app-update-article',
  templateUrl: './update-article.component.html',
  styleUrls: ['./update-article.component.css']
})
export class UpdateArticleComponent implements OnInit {

  dateV: Date;
  dateF: Date;
  id: number;
  article: Article;
  options: FormGroup;



  

  familleid : number;
  familleslist = [];
  sousfamilleslist = [];
  sousFamillesFamille = [];

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



   
  constructor(private articleService: ArticleService,private categoriesService : CategorieService,
    private familleService : FamilleService, private sousFamillesS : SousFamilleService, private typesArticlesService: TypeArticleService,
   private taxeService :TaxeService, private router: Router, private route : ActivatedRoute) { 
     
      this.initEnumList();
    }




  

  ngOnInit() {
     this.getAllFamilles();
    this.getAllCategories();
    this.getAllTypesArticles();
    this.getAllTaxes();
    this.article = new Article();

    this.id = this.route.snapshot.params['id'];
    
    this.articleService.getArticle(this.id)
      .subscribe(data => {
        console.log(data)
    //    this.dateV= new Date(data.dateValidite.slice(0,10));
      //  this.dateF= new Date(data.dateFabrication.slice(0,10));

        this.article = data;
        //this.article.dateValidite= this.dateV;
        //this.article.dateFabrication= this.dateF;

      }, error => console.log(error));       

  }

  updateArticle() {
    this.articleService.updateArticle(this.id, this.article)
      .subscribe(data => {
        console.log(data);
        this.article = new Article();
        this.gotoList();
      }, error => console.log(error));
  }

  onSubmit() {
    this.updateArticle();    
  }

  gotoList() {
    this.router.navigate(['/articles']);
  }
}
