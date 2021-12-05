import { Facture } from '../../../core/models/facture/facture';
import { Component, OnInit, Input } from '@angular/core';
import { FactureService } from "src/app/core/service/facture/facture.service";
import { Router, ActivatedRoute } from '@angular/router';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';


@Component({
  selector: 'app-facture-details',
  templateUrl: './facture-details.component.html',
  styleUrls: ['./facture-details.component.css']
})
export class FactureDetailsComponent implements OnInit {

  id: number;
  facture: Facture;
  options: FormGroup;
  hideRequiredControl = new FormControl(false);
  floatLabelControl = new FormControl('auto');

  constructor(private route: ActivatedRoute,private router: Router,
    private factureService: FactureService) { }

  ngOnInit() {
    this.facture = new Facture();

    this.id = this.route.snapshot.params['id'];
    
    this.factureService.getFacture(this.id)
      .subscribe(data => {
        console.log(data)
        this.facture = data;
      }, error => console.log(error));
  }

  list(){
    this.router.navigate(['factures']);
  }
}
