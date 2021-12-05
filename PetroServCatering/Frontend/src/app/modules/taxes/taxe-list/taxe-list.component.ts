import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {TaxeService} from '../../../core/service/taxe/taxe.service';
import {Taxe} from '../../../core/models/taxe/taxe';
import {ConfirmationDialog} from '../../employee/employee-list/confirmation-dialog.component';

@Component({
  selector: 'app-taxe-list',
  templateUrl: './taxe-list.component.html',
  styleUrls: ['./taxe-list.component.css']
})
export class TaxeListComponent implements OnInit {
  public taxes: Taxe[] = [];
  displayedColumns: string[] = ['type','sens', 'taux', 'dateDebut', 'dateFin', 'Actions'];
  dataSource: MatTableDataSource<Taxe>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private taxeService: TaxeService, private router: Router,
              private dialog: MatDialog,
              private snackBar: MatSnackBar) {
    this.dataSource = new MatTableDataSource(this.taxes);
  }

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    this.taxeService.getAllTaxes().subscribe(res => {
      this.taxes = res;
      this.dataSource.data = res;
    });
  }

  openDialog(id: number) {
    const dialogRef = this.dialog.open(ConfirmationDialog, {
      data: {
        message: 'Etes-vous sur de vouloir supprimer ce taxe ?',
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
        this.snackBar.open('Dialogue de  confimation de suppression', 'taxe supprimé', {
          duration: 2000,
        });
        this.deleteTaxe(id);
      } else {
        this.snackBar.dismiss();
      }
    });
  }

  deleteTaxe(id: number) {
    this.taxeService.deleteTaxe(id)
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },
        error => console.log(error));
  }

  taxeDetails(id: number){
    this.router.navigate(['/taxes/details', id]);
  }

  updateTaxe(id: number){
    this.router.navigate(['/taxes/update', id]);
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
