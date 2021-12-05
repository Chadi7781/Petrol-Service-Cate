
import { DeviseService } from "../../../core/service/devise/devise.service";
import { Devise } from '../../../core/models/devise/devise';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';


@Component({
  selector: 'app-create-devise',
  templateUrl: './create-devise.component.html',
  styleUrls: ['./create-devise.component.css']
})
export class CreateDeviseComponent implements OnInit {

  devise: Devise = new Devise();
  submitted = false;
  options: FormGroup;
  hideRequiredControl = new FormControl(false);
  floatLabelControl = new FormControl('auto');

  constructor(private deviseService: DeviseService,
    private router: Router) { }

  ngOnInit() {
  }

  
 
  newDevise(): void {
    this.submitted = false;
    this.devise = new Devise();
  }

  save() {
    this.deviseService
    .createDevise(this.devise).subscribe(data => {
      console.log(data)
      this.devise = new Devise();
      this.gotoList();
    }, 
    error => console.log(error));
  }

  onSubmit() {
    this.submitted = true;
    this.save();    
  }

  gotoList() {
    this.router.navigate(['/devises']);
  }

}