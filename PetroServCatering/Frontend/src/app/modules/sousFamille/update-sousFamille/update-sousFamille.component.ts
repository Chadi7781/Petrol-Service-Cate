import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SousFamilleService } from "../../../core/service/famille/sousFamille.service";
import { SousFamille } from '../../../core/models/famille/sousFamille';

import {FormBuilder, FormControl, FormGroup} from '@angular/forms';


@Component({
  selector: 'app-update-sousFamille',
  templateUrl: './update-sousFamille.component.html',
  styleUrls: ['./update-sousFamille.component.css']
})
export class UpdateSousFamilleComponent implements OnInit {
  familleId :number;
  id: number;
  sousFamille: SousFamille;
  options: FormGroup;
  hideRequiredControl = new FormControl(false);
  floatLabelControl = new FormControl('auto');
 


  constructor(private route: ActivatedRoute,private router: Router,
    private sousFamilleService: SousFamilleService) { }

  ngOnInit() {
    this.sousFamille = new SousFamille();

    this.id = this.route.snapshot.params['id'];
    
    this.sousFamilleService.getSousFamille(this.id)
      .subscribe(data => {
        console.log(data)
        this.sousFamille = data;
        this.familleId=data.famille.id;
      }, error => console.log(error));       

    }
  
    


  updateSousFamille() {
    this.sousFamilleService.updateSousFamille(this.id, this.sousFamille)
      .subscribe(data => {
        console.log(data);
        this.sousFamille = new SousFamille();
        this.gotoList();
      }, error => console.log(error));
  }

  onSubmit() {
    this.updateSousFamille();    
  }

  gotoList() {
    this.router.navigate(['/familles/update',this.familleId]);
  }
}
