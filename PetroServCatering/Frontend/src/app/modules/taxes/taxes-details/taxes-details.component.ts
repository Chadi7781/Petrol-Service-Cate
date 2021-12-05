import { Component, OnInit } from '@angular/core';
import {Taxe} from "../../../core/models/taxe/taxe";
import { Router, ActivatedRoute } from '@angular/router';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {TaxeService} from "../../../core/service/taxe/taxe.service";
@Component({
  selector: 'app-taxes-details',
  templateUrl: './taxes-details.component.html',
  styleUrls: ['./taxes-details.component.css']
})
export class TaxesDetailsComponent implements OnInit {

  id: number;
  taxe: Taxe;
  options: FormGroup;
  hideRequiredControl = new FormControl(false);
  floatLabelControl = new FormControl('auto');

  constructor(private route: ActivatedRoute,private router: Router,
              private taxeService: TaxeService) { }

  ngOnInit() {
    this.taxe = new Taxe();

    this.id = this.route.snapshot.params['id'];

    this.taxeService.getTaxeById(this.id)
      .subscribe(data => {
        console.log(data)
        this.taxe = data;
      }, error => console.log(error));
  }

  list(){
    this.router.navigate(['taxes']);
  }
}
