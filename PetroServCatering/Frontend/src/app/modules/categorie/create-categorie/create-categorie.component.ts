
import { CategorieService } from "../../../core/service/categorie/categorie.service";
import { Categorie } from '../../../core/models/categorie/categorie';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';


@Component({
  selector: 'app-create-categorie',
  templateUrl: './create-categorie.component.html',
  styleUrls: ['./create-categorie.component.css']
})
export class CreateCategorieComponent implements OnInit {

  categorie: Categorie = new Categorie();
  submitted = false;
  options: FormGroup;
  hideRequiredControl = new FormControl(false);
  floatLabelControl = new FormControl('auto');

  constructor(private categorieService: CategorieService,
    private router: Router) { }

  ngOnInit() {
  }

  
 
  newCategorie(): void {
    this.submitted = false;
    this.categorie = new Categorie();
  }

  save() {
    this.categorieService
    .createCategorie(this.categorie).subscribe(data => {
      console.log(data)
      this.categorie = new Categorie();
      this.gotoList();
    }, 
    error => console.log(error));
  }

  onSubmit() {
    this.submitted = true;
    this.save();    
  }

  gotoList() {
    this.router.navigate(['/categories']);
  }

}