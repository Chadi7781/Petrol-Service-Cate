import { Observable } from "rxjs";
import { ArticleService } from "../../../core/service/article/article.service";
import { Article } from '../../../core/models/article/article';
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
  selector: "app-article-list",
  templateUrl: "./article-list.component.html",
  styleUrls: ["./article-list.component.css"]
})
export class ArticleListComponent implements OnInit {

  public articles: Article[] = [];
  displayedColumns: string[] = ['id', 'name', 'famille', 'prix','Actions'];
  dataSource: MatTableDataSource<Article>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private articleService: ArticleService, private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar) {
     this.dataSource = new MatTableDataSource(this.articles);
    }

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    this.articleService.getArticlesList().subscribe(res => {
      this.articles = res;
      this.dataSource.data = res;
  });  
  }

  openDialog(id: number) {
    const dialogRef = this.dialog.open(ConfirmationDialog,{
      data:{
        message: 'Etes-vous sur de vouloir supprimer ce article ?',
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
        this.snackBar.open('Dialogue de  confimation de suppression', 'article supprimé', {
          duration: 2000,
        });
        this.deleteArticle(id)
      } else {
        this.snackBar.dismiss();
      }
    });
  }

  deleteArticle(id: number) {
    this.articleService.deleteArticle(id)
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },
        error => console.log(error));
  }

  articleDetails(id: number){
    this.router.navigate(['/articles/details', id]);
  }

  updateArticle(id: number){
    this.router.navigate(['/articles/update', id]);
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
