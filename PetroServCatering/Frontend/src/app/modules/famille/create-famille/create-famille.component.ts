
import { FamilleService } from "../../../core/service/famille/famille.service";
import { Famille } from '../../../core/models/famille/famille';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { SousFamilleService } from "src/app/core/service/famille/sousFamille.service";
import { MatSnackBar } from "@angular/material/snack-bar";


@Component({
  selector: 'app-create-famille',
  templateUrl: './create-famille.component.html',
  styleUrls: ['./create-famille.component.css']
})
export class CreateFamilleComponent implements OnInit {

  famille: Famille = new Famille();
  submitted = false;
  options: FormGroup;
  hideRequiredControl = new FormControl(false);
  floatLabelControl = new FormControl('auto');

  constructor(private familleService: FamilleService,
              private sousFamilleService : SousFamilleService,
               private _snackBar: MatSnackBar,
               private router : Router
                ) { }

  ngOnInit() {
  }

  
 
  newFamille(): void {
    this.submitted = false;
    this.famille = new Famille();
  }

  save() {
    this.familleService
    .createFamille(this.famille).subscribe(data => {
      console.log(data)
      this.famille = new Famille();
      this.gotoList();
      window.location.reload();
    }, 
    error => console.log(error));
  }

  onSubmit() {
    this.submitted = true;
    this.save();   
    this.gotoList(); 
  }

  gotoList() {
    this.router.navigate(['/familles']);
  }

}