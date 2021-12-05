import {Taxe} from "../../../core/models/taxe/taxe";
import { Component, OnInit, Input } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {TaxeService} from "../../../core/service/taxe/taxe.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-taxe',
  templateUrl: './create-taxe.component.html',
  styleUrls: ['./create-taxe.component.css']
})
export class CreateTaxeComponent implements OnInit {
  optionsList=["déductif","collectif"];


  taxe: Taxe = new Taxe();
  public taxes: Taxe[] = [];
  submitted = false;
  options: FormGroup;
  hideRequiredControl = new FormControl(false);
  floatLabelControl = new FormControl('auto');

  constructor(private taxeService: TaxeService,
              private router: Router) { }

  ngOnInit() {

  }



  newTaxe(): void {
    this.submitted = false;
    this.taxe = new Taxe();
  }

  save() {
    this.taxeService
      .createTaxe(this.taxe).subscribe(data => {
        this.taxe = new Taxe();
        this.gotoList();
      },
      error => console.log(error));
  }

  onSubmit() {
    this.submitted = true;
    this.save();
  }

  gotoList() {
    this.router.navigate(['/taxes']);
  }

}
