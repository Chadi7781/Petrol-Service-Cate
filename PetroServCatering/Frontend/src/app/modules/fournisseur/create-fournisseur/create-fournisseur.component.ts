
import { FournisseurService } from "../../../core/service/fournisseur/fournisseur.service";
import { Fournisseur } from '../../../core/models/fournisseur/fournisseur';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';


@Component({
  selector: 'app-create-fournisseur',
  templateUrl: './create-fournisseur.component.html',
  styleUrls: ['./create-fournisseur.component.css']
})
export class CreateFournisseurComponent implements OnInit {

  fournisseur: Fournisseur = new Fournisseur();
  submitted = false;

  options: FormGroup;
  hideRequiredControl = new FormControl(false);
  floatLabelControl = new FormControl('auto');

  constructor(private fournisseurService: FournisseurService,
    private router: Router) { }

  ngOnInit() {
  }

  newFournisseur(): void {
    this.submitted = false;
    this.fournisseur = new Fournisseur();
  }

  save() {
    this.fournisseurService
    .createFournisseur(this.fournisseur).subscribe(data => {
      console.log(data)
      this.fournisseur = new Fournisseur();
      this.gotoList();
    }, 
    error => console.log(error));
  }

  onSubmit() {
    this.submitted = true;
    this.save();    
  }

  gotoList() {
    this.router.navigate(['/fournisseurs']);
  }

}