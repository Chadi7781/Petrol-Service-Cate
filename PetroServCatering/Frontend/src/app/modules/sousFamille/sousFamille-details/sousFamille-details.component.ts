import { SousFamilleService } from "../../../core/service/Famille/sousFamille.service";
import { SousFamille } from '../../../core/models/Famille/sousFamille';
import { Component, OnInit, Input } from '@angular/core';
import { SousFamilleListComponent } from '../sousFamille-list/sousFamille-list.component';
import { Router, ActivatedRoute } from '@angular/router';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';


@Component({
  selector: 'app-sousFamille-details',
  templateUrl: './sousFamille-details.component.html',
  styleUrls: ['./sousFamille-details.component.css']
})
export class SousFamilleDetailsComponent implements OnInit {

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
      }, error => console.log(error));
  }

  list(){
    this.router.navigate(['sousFamilles']);
  }
}
