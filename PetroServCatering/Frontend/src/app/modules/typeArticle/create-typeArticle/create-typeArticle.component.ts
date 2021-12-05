
import { TypeArticleService } from "../../../core/service/typeArticle/typeArticle.service";
import { TypeArticle } from '../../../core/models/typeArticle/typeArticle';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';


@Component({
  selector: 'app-create-typeArticle',
  templateUrl: './create-typeArticle.component.html',
  styleUrls: ['./create-typeArticle.component.css']
})
export class CreateTypeArticleComponent implements OnInit {

  typeArticle: TypeArticle = new TypeArticle();
  submitted = false;
  options: FormGroup;
  hideRequiredControl = new FormControl(false);
  floatLabelControl = new FormControl('auto');

  constructor(private typeArticleService: TypeArticleService,
    private router: Router) { }

  ngOnInit() {
  }

  
 
  newTypeArticle(): void {
    this.submitted = false;
    this.typeArticle = new TypeArticle();
  }

  save() {
    this.typeArticleService
    .createTypeArticle(this.typeArticle).subscribe(data => {
      console.log(data)
      this.typeArticle = new TypeArticle();
      this.gotoList();
    }, 
    error => console.log(error));
  }

  onSubmit() {
    this.submitted = true;
    this.save();    
  }

  gotoList() {
    this.router.navigate(['/typeArticles']);
  }

}