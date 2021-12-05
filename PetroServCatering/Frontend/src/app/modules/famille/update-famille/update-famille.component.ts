import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FamilleService } from "../../../core/service/famille/famille.service";
import { Famille } from '../../../core/models/famille/famille';

import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import { SousFamilleService } from 'src/app/core/service/famille/sousFamille.service';
import { SousFamille } from 'src/app/core/Models/famille/sousFamille';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialog } from '../../employee/employee-list/confirmation-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-update-famille',
  templateUrl: './update-famille.component.html',
  styleUrls: ['./update-famille.component.css']
})
export class UpdateFamilleComponent implements OnInit {

  id: number;
  famille: Famille;
  options: FormGroup;
  public sousFamilles : SousFamille[] = [];
  hideRequiredControl = new FormControl(false);
  floatLabelControl = new FormControl('auto');
  


  constructor(private route: ActivatedRoute,private router: Router,
    private familleService: FamilleService,private dialog: MatDialog,private snackBar: MatSnackBar,private sousFamilleService : SousFamilleService) { }

  ngOnInit() {
    this.famille = new Famille();
    this.id = this.route.snapshot.params['id'];
    
    this.familleService.getFamille(this.id)
      .subscribe(data => {
        console.log(data)
        console.log(data.sousFamilles);

        this.famille = data
        this.sousFamilles=data.sousFamilles
      }, error => console.log(error));     
      
      

    }
  
    


  updateFamille() {
    this.familleService.updateFamille(this.id, this.famille)
      .subscribe(data => {
        console.log(data);
        this.famille = new Famille();
        this.gotoList();
      }, error => console.log(error));
  }
  ajouterSousFamille(){
    this.router.navigate(['/sousfamilles/add',this.id]);
  }

  onSubmit() {
    this.updateFamille();    
  }

  gotoList() {
    this.router.navigate(['/familles']);
  }


  //sous famille

  updatesousFamille(id : number){
    this.router.navigate(['/sousfamilles/update', id]);

   

  }
  openDialog(id: number) {
    const dialogRef = this.dialog.open(ConfirmationDialog,{
      data:{
        message: 'Etes-vous sur de vouloir supprimer cette sous famille ?',
        buttonText: {
          ok: 'Confirmer',
          cancel: 'Annuler'
        }
      }
    });
    const snack = this.snackBar.open('Dialogue de confimation de suppression');

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        snack.dismiss();
        const a = document.createElement('a');
        a.click();
        a.remove();
        snack.dismiss();
        this.deleteSousFamille(id);


        this.snackBar.open('Dialogue de  confimation de suppression', 'famille supprimé', {
          duration: 2000,
        });

        this.router.navigate(['/famille/update', id]);
      } else {
        this.snackBar.dismiss();
      }
    });
  }
  sousfamilleDetails(id : any){}
  deleteSousFamille(id: number) {
    this.sousFamilleService.deleteSousFamille(id)
      .subscribe(
        data => {
          console.log(data);
          this.reloadData(this.id);
        },
        error => console.log(error));
  }

  reloadData2(id : number) {
    
      this.router.navigate(['/famille/update', id]);

   
  }

 

  reloadData(id : number) {
    this.familleService.getFamille(id).subscribe(res => {
      this.famille = res;
      this.sousFamilles = res.sousFamilles;
  });  
  }


  
 
}
