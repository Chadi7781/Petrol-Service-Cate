import { Observable } from "rxjs";
import { CategorieService } from "../../../core/service/categorie/categorie.service";
import { Categorie } from '../../../core/models/categorie/categorie';
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
  selector: "app-categorie-list",
  templateUrl: "./categorie-list.component.html",
  styleUrls: ["./categorie-list.component.css"]
})
export class CategorieListComponent implements OnInit {

  public categories: Categorie[] = [];
  displayedColumns: string[] = ['id', 'code', 'name' , 'Actions'];
  dataSource: MatTableDataSource<Categorie>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private categorieService: CategorieService, private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar) {
     this.dataSource = new MatTableDataSource(this.categories);
    }

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    this.categorieService.getCategoriesList().subscribe(res => {
      this.categories = res;
      this.dataSource.data = res;
  });  
  }

  openDialog(id: number) {
    const dialogRef = this.dialog.open(ConfirmationDialog,{
      data:{
        message: 'Etes-vous sur de vouloir supprimer ce categorie ?',
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
        this.snackBar.open('Dialogue de  confimation de suppression', 'categorie supprimé', {
          duration: 2000,
        });
        this.deleteCategorie(id)
      } else {
        this.snackBar.dismiss();
      }
    });
  }

  deleteCategorie(id: number) {
    this.categorieService.deleteCategorie(id)
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },
        error => console.log(error));
  }

  categorieDetails(id: number){
    this.router.navigate(['categories/details', id]);
  }

  updateCategorie(id: number){
    this.router.navigate(['categories/update', id]);
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
