import { Observable } from "rxjs";
import { DeviseService } from "../../../core/service/devise/devise.service";
import { Devise } from '../../../core/models/devise/devise';
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
  selector: "app-devise-list",
  templateUrl: "./devise-list.component.html",
  styleUrls: ["./devise-list.component.css"]
})
export class DeviseListComponent implements OnInit {

  public devises: Devise[] = [];
  displayedColumns: string[] = ['id', 'name', 'taux' , 'Actions'];
  dataSource: MatTableDataSource<Devise>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private deviseService: DeviseService, private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar) {
     this.dataSource = new MatTableDataSource(this.devises);
    }

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    this.deviseService.getDevisesList().subscribe(res => {
      this.devises = res;
      this.dataSource.data = res;
  });  
  }

  openDialog(id: number) {
    const dialogRef = this.dialog.open(ConfirmationDialog,{
      data:{
        message: 'Etes-vous sur de vouloir supprimer ce devise ?',
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
        this.snackBar.open('Dialogue de  confimation de suppression', 'devise supprimé', {
          duration: 2000,
        });
        this.deleteDevise(id)
      } else {
        this.snackBar.dismiss();
      }
    });
  }

  deleteDevise(id: number) {
    this.deviseService.deleteDevise(id)
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },
        error => console.log(error));
  }

  deviseDetails(id: number){
    this.router.navigate(['devises/details', id]);
  }

  updateDevise(id: number){
    this.router.navigate(['devises/update', id]);
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
