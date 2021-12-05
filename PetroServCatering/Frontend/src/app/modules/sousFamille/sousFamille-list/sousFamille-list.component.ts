import { Observable } from "rxjs";
import { SousFamilleService } from "../../../core/service/famille/sousFamille.service";
import { SousFamille } from '../../../core/models/famille/sousFamille';
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
  selector: "app-sousFamille-list",
  templateUrl: "./sousFamille-list.component.html",
  styleUrls: ["./sousFamille-list.component.css"]
})
export class SousFamilleListComponent implements OnInit {

  public sousFamilles: SousFamille[] = [];
  displayedColumns: string[] = ['id', 'code', 'name' ,'Actions'];
  dataSource: MatTableDataSource<SousFamille>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private sousFamilleService: SousFamilleService, private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar) {
     this.dataSource = new MatTableDataSource(this.sousFamilles);
    }

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    this.sousFamilleService.getSousFamillesList().subscribe(res => {
      this.sousFamilles = res;
      this.dataSource.data = res;
  });  
  }

  openDialog(id: number) {
    const dialogRef = this.dialog.open(ConfirmationDialog,{
      data:{
        message: 'Etes-vous sur de vouloir supprimer ce sousFamille ?',
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
        this.snackBar.open('Dialogue de  confimation de suppression', 'sousFamille supprimé', {
          duration: 2000,
        });
        this.deleteSousFamille(id)
      } else {
        this.snackBar.dismiss();
      }
    });
  }

  deleteSousFamille(id: number) {
    this.sousFamilleService.deleteSousFamille(id)
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },
        error => console.log(error));
  }

  sousFamilleDetails(id: number){
    this.router.navigate(['sousfamilles/details', id]);
  }

  updateSousFamille(id: number){
    this.router.navigate(['sousfamilles/update', id]);
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
