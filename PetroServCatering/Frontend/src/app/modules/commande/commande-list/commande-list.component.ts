import { Observable } from "rxjs";
import { CommandeService } from "../../../core/service/commande/commande.service";
import { Commande } from "../../../core/models/commande/commande";
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
import { Facture } from "src/app/core/models/facture/facture";
import { FactureService } from "src/app/core/service/facture/facture.service";

@Component({
  selector: "app-commande-list",
  templateUrl: "./commande-list.component.html",
  styleUrls: ["./commande-list.component.css"],
})
export class CommandeListComponent implements OnInit {
  public commandes: Commande[] = [];
  public commande: Commande = new Commande();
  public facture: Facture = new Facture();
  displayedColumns: string[] = [
    "numero",
    "fournisseur",
    "totalTtc",
    "etat",
    "devis N°",
    "Actions",
  ];
  dataSource: MatTableDataSource<Commande>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private commandeService: CommandeService,
    private factureService: FactureService,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.dataSource = new MatTableDataSource(this.commandes);
  }

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    this.commandeService.getCommandesList().subscribe((res) => {
      this.commandes = res;
      this.dataSource.data = res;
    });
  }

  openDialog(id: number) {
    const dialogRef = this.dialog.open(ConfirmationDialog, {
      data: {
        message: "Etes-vous sur de vouloir supprimer ce commande ?",
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
          "commande supprimé",
          {
            duration: 2000,
          }
        );
        this.deleteCommande(id);
      } else {
        this.snackBar.dismiss();
      }
    });
  }

  deleteCommande(id: number) {
    this.commandeService.deleteCommande(id).subscribe(
      (data) => {
        console.log(data);
        //this.reloadData();
      },
      (error) => console.log(error)
    );
  }

  commandeDetails(id: number) {
    this.router.navigate(["/commandes/details", id]);
  }

  updateCommande(id: number) {
    this.router.navigate(["/commandes/update", id]);
  }

  commandeValider(id: number) {
    this.router.navigate(["/commandes/valider", id]);
  }

  genererFactureService(id: number) {
    this.commandeService.getCommande(id).subscribe(
      (data) => {
        console.log(data);
        this.commande = data;
        this.commandeService
          .genererFactureService(id, data)
          .subscribe((data) => {
            console.log(data);
            if (data === true) {
              console.log(this.commande);
              this.router.navigate(["/commandes/generer-facture-service", id]);
            } else {
              this.snackBar.open(
                "Un article n'est pas de type Service",
                "close",
                { duration: 2000 }
              );
            }
          });
      },
      (error) => {
        console.log(error);
      }
    );
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
