import { FamilleService } from "../../../core/service/famille/famille.service";
import { Famille } from '../../../core/models/famille/famille';
import { Component, OnInit, Input } from '@angular/core';
import { FamilleListComponent } from '../famille-list/famille-list.component';
import { Router, ActivatedRoute } from '@angular/router';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import { SousFamille } from "src/app/core/Models/famille/sousFamille";


@Component({
  selector: 'app-famille-details',
  templateUrl: './famille-details.component.html',
  styleUrls: ['./famille-details.component.css']
})
export class FamilleDetailsComponent implements OnInit {

  id: number;
  
  famille: Famille;
  options: FormGroup;
  public sousFamilles : SousFamille[] = [];

  hideRequiredControl = new FormControl(false);
  floatLabelControl = new FormControl('auto');

  constructor(private route: ActivatedRoute,private router: Router,
    private familleService: FamilleService) { }

  ngOnInit() {
    this.famille = new Famille();

    this.id = this.route.snapshot.params['id'];
    
    this.familleService.getFamille(this.id)
      .subscribe(data => {
        console.log(data)
        this.famille = data;
        this.sousFamilles=data.sousFamilles
        console.log(this.sousFamilles)
      }, error => console.log(error));
  }

  list(){
    this.router.navigate(['familles']);
  }
}
