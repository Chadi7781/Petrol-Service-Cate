import { FournisseurService } from "../../../core/service/fournisseur/fournisseur.service";
import { Fournisseur } from '../../../core/models/fournisseur/fournisseur';
import { Component, OnInit, Input } from '@angular/core';
import { FournisseurListComponent } from '../fournisseur-list/fournisseur-list.component';
import { Router, ActivatedRoute } from '@angular/router';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';


@Component({
  selector: 'app-fournisseur-details',
  templateUrl: './fournisseur-details.component.html',
  styleUrls: ['./fournisseur-details.component.css']
})
export class FournisseurDetailsComponent implements OnInit {

  id: number;
  fournisseur: Fournisseur;
  options: FormGroup;
  hideRequiredControl = new FormControl(false);
  floatLabelControl = new FormControl('auto');

  constructor(private route: ActivatedRoute,private router: Router,
    private fournisseurService: FournisseurService) { }

  ngOnInit() {
    this.fournisseur = new Fournisseur();

    this.id = this.route.snapshot.params['id'];
    
    this.fournisseurService.getFournisseur(this.id)
      .subscribe(data => {
        console.log(data)
        this.fournisseur = data;
      }, error => console.log(error));
  }

  list(){
    this.router.navigate(['fournisseurs']);
  }
}
