import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FournisseurService } from "../../../core/service/fournisseur/fournisseur.service";
import { Fournisseur } from '../../../core/models/fournisseur/fournisseur';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';


@Component({
  selector: 'app-update-fournisseur',
  templateUrl: './update-fournisseur.component.html',
  styleUrls: ['./update-fournisseur.component.css']
})
export class UpdateFournisseurComponent implements OnInit {

  date: Date;
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
        this.date= new Date(data.date.slice(0,10));

        this.fournisseur = data;
        this.fournisseur.date= this.date;

      }, error => console.log(error));       

  }

  updateFournisseur() {
    this.fournisseurService.updateFournisseur(this.id, this.fournisseur)
      .subscribe(data => {
        console.log(data);
        this.fournisseur = new Fournisseur();
        this.gotoList();
      }, error => console.log(error));
  }

  onSubmit() {
    this.updateFournisseur();    
  }

  gotoList() {
    this.router.navigate(['/fournisseurs']);
  }
}
