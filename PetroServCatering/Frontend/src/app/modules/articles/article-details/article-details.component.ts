import { ArticleService } from "../../../core/service/article/article.service";
import { Article } from '../../../core/models/article/article';
import { Component, OnInit, Input } from '@angular/core';
import { ArticleListComponent } from '../article-list/article-list.component';
import { Router, ActivatedRoute } from '@angular/router';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';


@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.css']
})
export class ArticleDetailsComponent implements OnInit {

  id: number;
  article: Article;
  options: FormGroup;
  hideRequiredControl = new FormControl(false);
  floatLabelControl = new FormControl('auto');

  constructor(private route: ActivatedRoute,private router: Router,
    private articleService: ArticleService) { }

  ngOnInit() {
    this.article = new Article();

    this.id = this.route.snapshot.params['id'];
    
    this.articleService.getArticle(this.id)
      .subscribe(data => {
        console.log(data)
        this.article = data;
      }, error => console.log(error));
  }

  list(){
    this.router.navigate(['articles']);
  }
}
