import { Observable } from "rxjs";
import { BonReception } from '../../../core/models/bonReception/bonReception';
import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { AfterViewInit, ViewChild, Inject} from '@angular/core';
import { MatPaginator} from '@angular/material/paginator';
import { MatSort} from '@angular/material/sort';
import { MatTableDataSource} from '@angular/material/table';
import { ConfirmationDialog} from '../../employee/employee-list/confirmation-dialog.component';
import { MatDialog, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BonReceptionService } from "src/app/core/service/bonReception/bonReception.service";

@Component({
  selector: "app-bonReception-list",
  templateUrl: "./bonReception-list.component.html",
  styleUrls: ["./bonReception-list.component.css"]
})
export class BonReceptionListComponent implements OnInit {

  public bonReceptions: BonReception[] = [];
  displayedColumns: string[] = ['numero', 'fournisseur', 'totalTtc', 'etat','Actions'];
  dataSource: MatTableDataSource<BonReception>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private bonReceptionService: BonReceptionService, private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar) {
     this.dataSource = new MatTableDataSource(this.bonReceptions);
    }

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    this.bonReceptionService.getBonReceptionsList().subscribe(res => {
      this.bonReceptions = res;
      this.dataSource.data = res;
  });  
  }

  openDialog(id: number) {
    const dialogRef = this.dialog.open(ConfirmationDialog,{
      data:{
        message: 'Etes-vous sur de vouloir supprimer ce bonReception ?',
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
        this.snackBar.open('Dialogue de  confimation de suppression', 'bonReception supprimé', {
          duration: 2000,
        });
        this.deleteBonReception(id)
      } else {
        this.snackBar.dismiss();
      }
    });
  }

  deleteBonReception(id: number) {
    this.bonReceptionService.deleteBonReception(id)
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },
        error => console.log(error));
  }

  bonReceptionDetails(id: number){
    this.router.navigate(['/bonReceptions/details', id]);
  }

  updateBonReception(id: number){
    this.router.navigate(['/bonReceptions/update', id]);
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
