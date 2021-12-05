import { CategorieService } from "../../../core/service/categorie/categorie.service";
import { Categorie } from '../../../core/models/categorie/categorie';
import { Component, OnInit, Input } from '@angular/core';
import { CategorieListComponent } from '../categorie-list/categorie-list.component';
import { Router, ActivatedRoute } from '@angular/router';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';


@Component({
  selector: 'app-categorie-details',
  templateUrl: './categorie-details.component.html',
  styleUrls: ['./categorie-details.component.css']
})
export class CategorieDetailsComponent implements OnInit {

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

  list(){
    this.router.navigate(['categories']);
  }
}
