import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TypeArticleService } from "../../../core/service/typeArticle/typeArticle.service";
import { TypeArticle } from '../../../core/models/typeArticle/typeArticle';

import {FormBuilder, FormControl, FormGroup} from '@angular/forms';


@Component({
  selector: 'app-update-typeArticle',
  templateUrl: './update-typeArticle.component.html',
  styleUrls: ['./update-typeArticle.component.css']
})
export class UpdateTypeArticleComponent implements OnInit {

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
  
    


  updateTypeArticle() {
    this.typeArticleService.updateTypeArticle(this.id, this.typeArticle)
      .subscribe(data => {
        console.log(data);
        this.typeArticle = new TypeArticle();
        this.gotoList();
      }, error => console.log(error));
  }

  onSubmit() {
    this.updateTypeArticle();    
  }

  gotoList() {
    this.router.navigate(['/typeArticles']);
  }
}
