import { TypeArticleService } from "../../../core/service/typeArticle/typeArticle.service";
import { TypeArticle } from '../../../core/models/typeArticle/typeArticle';
import { Component, OnInit, Input } from '@angular/core';
import { TypeArticleListComponent } from '../typeArticle-list/typeArticle-list.component';
import { Router, ActivatedRoute } from '@angular/router';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';


@Component({
  selector: 'app-typeArticle-details',
  templateUrl: './typeArticle-details.component.html',
  styleUrls: ['./typeArticle-details.component.css']
})
export class TypeArticleDetailsComponent implements OnInit {

  id: number;
  typeArticle: TypeArticle;
  options: FormGroup;
  hideRequiredControl = new FormControl(false);
  floatLabelControl = new FormControl('auto');

  constructor(private route: ActivatedRoute,private router: Router,
    private typeArticleService: TypeArticleService) { }

  ngOnInit() {
    this.typeArticle = new TypeArticle();

    this.id = this.route.snapshot.params['id'];
    
    this.typeArticleService.getTypeArticle(this.id)
      .subscribe(data => {
        console.log(data)
        this.typeArticle = data;
      }, error => console.log(error));
  }

  list(){
    this.router.navigate(['typeArticles']);
  }
}
