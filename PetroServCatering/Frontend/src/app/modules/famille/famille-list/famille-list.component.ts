import { Observable } from "rxjs";
import { FamilleService } from "../../../core/service/famille/famille.service";
import { Famille } from '../../../core/models/famille/famille';
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
  selector: "app-famille-list",
  templateUrl: "./famille-list.component.html",
  styleUrls: ["./famille-list.component.css"]
})
export class FamilleListComponent implements OnInit {

  public familles: Famille[] = [];
  displayedColumns: string[] = ['id', 'code', 'name' , 'Actions'];
  dataSource: MatTableDataSource<Famille>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private familleService: FamilleService, private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar) {
     this.dataSource = new MatTableDataSource(this.familles);
    }

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    this.familleService.getFamillesList().subscribe(res => {
      this.familles = res;
      this.dataSource.data = res;
  });  
  }

  openDialog(id: number) {
    const dialogRef = this.dialog.open(ConfirmationDialog,{
      data:{
        message: 'Etes-vous sur de vouloir supprimer ce famille ?',
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
        this.snackBar.open('Dialogue de  confimation de suppression', 'famille supprimé', {
          duration: 2000,
        });
        this.deleteFamille(id)
      } else {
        this.snackBar.dismiss();
      }
    });
  }

  deleteFamille(id: number) {
    this.familleService.deleteFamille(id)
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },
        error => console.log(error));
  }

  familleDetails(id: number){
    this.router.navigate(['familles/details', id]);
  }

  updateFamille(id: number){
    this.router.navigate(['familles/update', id]);
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
