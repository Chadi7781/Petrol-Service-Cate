import { Observable } from "rxjs";
import { Facture } from '../../../core/models/facture/facture';
import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { AfterViewInit, ViewChild, Inject} from '@angular/core';
import { MatPaginator} from '@angular/material/paginator';
import { MatSort} from '@angular/material/sort';
import { MatTableDataSource} from '@angular/material/table';
import { ConfirmationDialog} from '../../employee/employee-list/confirmation-dialog.component';
import { MatDialog, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FactureService } from "src/app/core/service/facture/facture.service";

@Component({
  selector: "app-facture-list",
  templateUrl: "./facture-list.component.html",
  styleUrls: ["./facture-list.component.css"]
})
export class FactureListComponent implements OnInit {

  public factures: Facture[] = [];
  displayedColumns: string[] = ['numero', 'fournisseur', 'totalTtc', 'etat' ,'Actions'];
  dataSource: MatTableDataSource<Facture>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private factureService: FactureService, private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar) {
     this.dataSource = new MatTableDataSource(this.factures);
    }

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    this.factureService.getFacturesList().subscribe(res => {
      this.factures = res;
      this.dataSource.data = res;
  });  
  }

  openDialog(id: number) {
    const dialogRef = this.dialog.open(ConfirmationDialog,{
      data:{
        message: 'Etes-vous sur de vouloir supprimer cette facture ?',
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
        this.snackBar.open('Dialogue de  confimation de suppression', 'facture supprimé', {
          duration: 2000,
        });
        this.deleteFacture(id)
      } else {
        this.snackBar.dismiss();
      }
    });
  }

  deleteFacture(id: number) {
    this.factureService.deleteFacture(id)
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },
        error => console.log(error));
  }

  factureDetails(id: number){
    this.router.navigate(['/factures/details', id]);
  }

  updateFacture(id: number){
    this.router.navigate(['/factures/update', id]);
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
