import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategorieService } from "../../../core/service/categorie/categorie.service";
import { Categorie } from '../../../core/models/categorie/categorie';

import {FormBuilder, FormControl, FormGroup} from '@angular/forms';


@Component({
  selector: 'app-update-categorie',
  templateUrl: './update-categorie.component.html',
  styleUrls: ['./update-categorie.component.css']
})
export class UpdateCategorieComponent implements OnInit {

  id: number;
  categorie: Categorie;
  options: FormGroup;
  hideRequiredControl = new FormControl(false);
  floatLabelControl = new FormControl('auto');
 


  constructor(private route: ActivatedRoute,private router: Router,
    private categorieService: CategorieService) { }

  ngOnInit() {
    this.categorie = new Categorie();

    this.id = this.route.snapshot.params['id'];
    
    this.categorieService.getCategorie(this.id)
      .subscribe(data => {
        console.log(data)
        this.categorie = data;
      }, error => console.log(error));       

    }
  
    


  updateCategorie() {
    this.categorieService.updateCategorie(this.id, this.categorie)
      .subscribe(data => {
        console.log(data);
        this.categorie = new Categorie();
        this.gotoList();
      }, error => console.log(error));
  }

  onSubmit() {
    this.updateCategorie();    
  }

  gotoList() {
    this.router.navigate(['/categories']);
  }
}
