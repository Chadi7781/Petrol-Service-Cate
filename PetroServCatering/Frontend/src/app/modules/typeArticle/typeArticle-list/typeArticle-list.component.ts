import { Observable } from "rxjs";
import { TypeArticleService } from "../../../core/service/typeArticle/typeArticle.service";
import { TypeArticle } from '../../../core/models/typeArticle/typeArticle';
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
  selector: "app-typeArticle-list",
  templateUrl: "./typeArticle-list.component.html",
  styleUrls: ["./typeArticle-list.component.css"]
})
export class TypeArticleListComponent implements OnInit {

  public typeArticles: TypeArticle[] = [];
  displayedColumns: string[] = ['id', 'code', 'designation' , 'Actions'];
  dataSource: MatTableDataSource<TypeArticle>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private typeArticleService: TypeArticleService, private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar) {
     this.dataSource = new MatTableDataSource(this.typeArticles);
    }

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    this.typeArticleService.getTypeArticlesList().subscribe(res => {
      this.typeArticles = res;
      this.dataSource.data = res;
  });  
  }

  openDialog(id: number) {
    const dialogRef = this.dialog.open(ConfirmationDialog,{
      data:{
        message: 'Etes-vous sur de vouloir supprimer ce typeArticle ?',
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
        this.snackBar.open('Dialogue de  confimation de suppression', 'typeArticle supprimé', {
          duration: 2000,
        });
        this.deleteTypeArticle(id)
      } else {
        this.snackBar.dismiss();
      }
    });
  }

  deleteTypeArticle(id: number) {
    this.typeArticleService.deleteTypeArticle(id)
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },
        error => console.log(error));
  }

  typeArticleDetails(id: number){
    this.router.navigate(['typeArticles/details', id]);
  }

  updateTypeArticle(id: number){
    this.router.navigate(['typeArticles/update', id]);
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
