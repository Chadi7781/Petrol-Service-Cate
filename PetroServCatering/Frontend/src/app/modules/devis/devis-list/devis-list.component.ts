import { Observable } from "rxjs";
import { DevisService } from "../../../core/service/devis/devis.service";
import { Devis } from "../../../core/models/devis/devis";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AfterViewInit, ViewChild, Inject } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { ConfirmationDialog } from "../../employee/employee-list/confirmation-dialog.component";
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogConfig,
} from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Commande } from "src/app/core/Models/commande/commande";
import { CommandeService } from "src/app/core/service/commande/commande.service";
import { EtatService } from "src/app/core/service/etat/etat.service";
import { Etat } from "src/app/core/Models/etat/etat";

@Component({
  selector: "app-devis-list",
  templateUrl: "./devis-list.component.html",
  styleUrls: ["./devis-list.component.css"],
})
export class DevisListComponent implements OnInit {
  public devisList: Devis[] = [];
  public devis: Devis = new Devis();
  public commande: Commande = new Commande();
  public etatCommande: Etat = new Etat();
  displayedColumns: string[] = [
    "numero",
    "fournisseur",
    "totalTtc",
    "etat",
    "Actions",
  ];
  dataSource: MatTableDataSource<Devis>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private devisService: DevisService,
    private commandeService: CommandeService,
    private etatService: EtatService,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.dataSource = new MatTableDataSource(this.devisList);
  }

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    this.devisService.getDevisList().subscribe((res) => {
      this.devisList = res;
      this.dataSource.data = res;
    });
  }

  openDialog(id: number) {
    const dialogRef = this.dialog.open(ConfirmationDialog, {
      data: {
        message: "Etes-vous sur de vouloir supprimer ce devis ?",
        buttonText: {
          ok: "Confirmer",
          cancel: "Annuler",
        },
      },
    });
    const snack = this.snackBar.open("Dialogue de confimation de suppression");

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        snack.dismiss();
        const a = document.createElement("a");
        a.click();
        a.remove();
        snack.dismiss();
        this.snackBar.open(
          "Dialogue de  confimation de suppression",
          "devis supprimé",
          {
            duration: 2000,
          }
        );
        this.deleteDevis(id);
      } else {
        this.snackBar.dismiss();
      }
    });
  }

  deleteDevis(id: number) {
    this.devisService.deleteDevis(id).subscribe(
      (data) => {
        console.log(data);
        this.reloadData();
      },
      (error) => console.log(error)
    );
  }

  devisDetails(id: number) {
    this.router.navigate(["/devislist/details", id]);
  }

  updateDevis(id: number) {
    this.router.navigate(["/devislist/update", id]);
  }

  genererCommande(id: number) {
    this.router.navigate(["/commandes/generer", id]);
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
