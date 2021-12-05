import { Observable } from "rxjs";
import { MagasinService } from "../../../core/service/magasin/magasin.service";
import { Magasin } from '../../../core/models/magasin/magasin';
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
  selector: "app-magasin-list",
  templateUrl: "./magasin-list.component.html",
  styleUrls: ["./magasin-list.component.css"]
})
export class MagasinListComponent implements OnInit {

  public magasins: Magasin[] = [];
  displayedColumns: string[] = ['id', 'designation', 'adresse', 'tel','Actions'];
  dataSource: MatTableDataSource<Magasin>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private magasinService: MagasinService, private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar) {
     this.dataSource = new MatTableDataSource(this.magasins);
    }

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    this.magasinService.getMagasinsList().subscribe(res => {
      this.magasins = res;
      this.dataSource.data = res;
  });  
  }

  openDialog(id: number) {
    const dialogRef = this.dialog.open(ConfirmationDialog,{
      data:{
        message: 'Etes-vous sur de vouloir supprimer ce magasin ?',
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
        this.snackBar.open('Dialogue de  confimation de suppression', 'magasin supprimé', {
          duration: 2000,
        });
        this.deleteMagasin(id)
      } else {
        this.snackBar.dismiss();
      }
    });
  }

  deleteMagasin(id: number) {
    this.magasinService.deleteMagasin(id)
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },
        error => console.log(error));
  }

  magasinDetails(id: number){
    this.router.navigate(['magasins/details', id]);
  }

  updateMagasin(id: number){
    this.router.navigate(['magasins/update', id]);
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
