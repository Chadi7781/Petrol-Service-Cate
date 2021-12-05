
import { SousFamilleService } from "../../../core/service/Famille/sousFamille.service";
import { SousFamille } from '../../../core/models/Famille/sousFamille';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { Famille } from "src/app/core/Models/famille/famille";
import { FamilleService } from "src/app/core/service/famille/famille.service";


@Component({
  selector: 'app-create-sousFamille',
  templateUrl: './create-sousFamille.component.html',
  styleUrls: ['./create-sousFamille.component.css']
})
export class CreateSousFamilleComponent implements OnInit {
  familleid : number;
  familleSource : Famille = new Famille();
  sousFamille: SousFamille = new SousFamille();
  famille : Famille = new Famille();
  submitted = false;
  idf : number ;
  options: FormGroup;
  hideRequiredControl = new FormControl(false);
  floatLabelControl = new FormControl('auto');
  public familleslist: Famille[] = [];
  constructor(private route: ActivatedRoute,private sousFamilleService: SousFamilleService,
    private familleService : FamilleService,
    private router: Router,
    ) { }

  ngOnInit() {
    this.getAllFamilles();
    this.idf = this.route.snapshot.params['idf'];

    this.getFamille();

  }

  
  getAllFamilles(){
    
    this.familleService.getFamillesList().subscribe(res=>{
      this.familleslist= res ;
    })
  }
  getFamille(){
    
    this.familleService.getFamille(this.idf).subscribe(res=>{
      this.familleSource= res ;
    })
  }
  newSousFamille(): void {
    this.submitted = false;
    this.sousFamille = new SousFamille();
  }

  save() {
    this.famille.id=this.familleid;
    this.sousFamille.famille=this.famille;
    this.sousFamilleService
    .createSousFamille(this.sousFamille).subscribe(data => {
      this.sousFamille = new SousFamille();
      this.gotoList();
    }, 
    error => console.log(error));
  }

  onSubmit() {
    this.submitted = true;
    this.save();    
  }

  gotoList() {
    this.router.navigate(['/familles/update',this.famille.id]);
  }

}