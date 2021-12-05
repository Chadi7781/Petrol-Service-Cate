import { Component, OnInit } from '@angular/core';
import { Taxe} from "../../../core/models/taxe/taxe";
import { TaxeService} from "../../../core/service/taxe/taxe.service";
import { FormControl, FormGroup} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-taxe',
  templateUrl: './update-taxe.component.html',
  styleUrls: ['./update-taxe.component.css']
})
export class UpdateTaxeComponent implements OnInit {

  optionsList=["déductif","collectif"];

  dateD: Date;
  dateF: Date;
  id: number;
  type: string;
  sens:string;
  taux: any;
  taxe:Taxe;
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
        this.dateD= new Date(data.dateDebut.slice(0,10));
        this.dateF= new Date(data.dateFin.slice(0,10));

        this.taxe = data;
        this.taxe.dateDebut= this.dateD;
        this.taxe.dateFin= this.dateF;

      }, error => console.log(error));

  }

  updateTaxe() {
    this.taxeService.updateTaxe(this.taxe, this.id)
      .subscribe(data => {
        console.log(data);
        this.taxe = new Taxe();
        this.gotoList();
      }, error => console.log(error));
  }

  onSubmit() {
    this.updateTaxe();
    this.gotoList();
  }

  gotoList() {
    this.router.navigate(['/taxes']);
  }
}
