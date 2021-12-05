import { Observable } from "rxjs";
import { FournisseurService } from "../../../core/service/fournisseur/fournisseur.service";
import { Fournisseur } from '../../../core/models/fournisseur/fournisseur';
import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { AfterViewInit, ViewChild, Inject} from '@angular/core';
import { MatPaginator} from '@angular/material/paginator';
import { MatSort} from '@angular/material/sort';
import { MatTableDataSource} from '@angular/material/table';
import { ConfirmationDialog} from '../../employee/employee-list/confirmation-dialog.component';
import { MatDialog, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: "app-fournisseur-list",
  templateUrl: "./fournisseur-list.component.html",
  styleUrls: ["./fournisseur-list.component.css"]
})
export class FournisseurListComponent implements OnInit {

  public fournisseurs: Fournisseur[] = [];
  displayedColumns: string[] = ['id', 'raisonSociale', 'numero', 'tel','Actions'];
  dataSource: MatTableDataSource<Fournisseur>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private fournisseurService: FournisseurService, private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar) {
     this.dataSource = new MatTableDataSource(this.fournisseurs);
    }

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    this.fournisseurService.getFournisseursList().subscribe(res => {
      this.fournisseurs = res;
      this.dataSource.data = res;
  });  
  }

  openDialog(id: number) {
    const dialogRef = this.dialog.open(ConfirmationDialog,{
      data:{
        message: 'Etes-vous sur de vouloir supprimer ce fournisseur ?',
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
        this.snackBar.open('Dialogue de  confimation de suppression', 'fournisseur supprimé', {
          duration: 2000,
        });
        this.deleteFournisseur(id)
      } else {
        this.snackBar.dismiss();
      }
    });
  }

  deleteFournisseur(id: number) {
    this.fournisseurService.deleteFournisseur(id)
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },
        error => console.log(error));
  }

  fournisseurDetails(id: number){
    this.router.navigate(['/fournisseurs/details', id]);
  }

  updateFournisseur(id: number){
    this.router.navigate(['/fournisseurs/update', id]);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
