import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { CommandeService } from "../../../core/service/commande/commande.service";
import { Commande } from "../../../core/models/commande/commande";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { LigneCommande } from "../../../core/models/commande/ligneCommande";
import { Article } from "../../../core/models/article/article";
import { FournisseurService } from "../../../core/service/fournisseur/fournisseur.service";
import { ArticleService } from "../../../core/service/article/article.service";
import { Fournisseur } from "../../../core/models/fournisseur/fournisseur";
import { LigneCommandeService } from "src/app/core/service/commande/ligneCommande.service";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-update-commande",
  templateUrl: "./update-commande.component.html",
  styleUrls: ["./update-commande.component.css"],
})
export class UpdateCommandeComponent implements OnInit {
  id: number;
  commande: Commande;
  submitted = false;
  idCommande: number;
  public fournisseurs: Fournisseur[] = [];
  public articles: Article[] = [];
  ligneCommande: LigneCommande = new LigneCommande();
  //public ligneDeCommandes: LigneCommande[] = [];
  options: FormGroup;
  hideRequiredControl = new FormControl(false);
  floatLabelControl = new FormControl("auto");

  constructor(
    private commandeService: CommandeService,
    private ligneCommandeService: LigneCommandeService,
    private fournisseurService: FournisseurService,
    private articleService: ArticleService,
    private router: Router,
    private _snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) {}
  ngOnInit() {
    this.getAllFournisseur();
    this.getAllArticle();
    this.id = this.route.snapshot.params["id"];
    this.commandeService.getCommande(this.id).subscribe(
      (data) => {
        console.log(data);
        this.commande = data;
        this.commande.date = new Date(data.date.slice(0, 10));
        console.log(this.commande.fournisseur);

        console.log(this.commande.fournisseur);
      },
      (error) => console.log(error)
    );

    this.newDynamic = {};
    this.ligneCommandes.push(this.newDynamic);
  }

  getAllFournisseur() {
    this.fournisseurService.getFournisseursList().subscribe((res) => {
      this.fournisseurs = res;
    });
  }

  getAllArticle() {
    this.articleService.getArticlesList().subscribe((res) => {
      this.articles = res;
    });
  }

  newCommande(): void {
    this.submitted = false;
    this.commande = new Commande();
  }

  save() {
    console.log("element", this.commande);
    this.commandeService.createCommande(this.commande).subscribe(
      (data) => {},
      (error) => console.log(error)
    );
    this.gotoList();
  }

  onSubmit() {
    this.id = this.route.snapshot.params["id"];

    this.commandeService.getCommande(this.id).subscribe(
      (data) => {
        console.log(data);
        this.commande = data;
      },
      (error) => console.log(error)
    );
    this.submitted = true;
    this.updateCommande();
  }

  updateCommande() {
    this.commandeService.updateCommande(this.id, this.commande).subscribe(
      (data) => {
        console.log(data);
        this.commande = new Commande();
        this.gotoList();
      },
      (error) => console.log(error)
    );
  }

  gotoList() {
    this.router.navigate(["/commandes"]);
  }

  ligneCommandes: Array<LigneCommande> = [];
  newDynamic: any = {};

  addRow() {
    this.calculerCommande();
    this.newDynamic = {};
    this.ligneCommandes.push(this.newDynamic);
    console.log(this.ligneCommandes);
    return true;
  }

  deleteRow(index) {
    this.calculerCommande();
    if (this.ligneCommandes.length == 1) {
      this._snackBar.open(
        "Vous ne pouvez pas supprimé la ligne quand il y a une seule ligne !",
        "Warning",
        {
          duration: 2000,
        }
      );
      return false;
    } else {
      this.ligneCommandes.splice(index, 1);
      //  this.toastr.warning('Row deleted successfully', 'Delete row');
      return true;
    }
  }
  calculerCommande() {
    if (
      this.commande.ligneCommandes.length > 0 &&
      this.commande.ligneCommandes[0].article != null
    ) {
      this.commande.totalHt = 0;
      this.commande.remise = 0;
      this.commande.totalTtc = 0;
      this.commande.totalTaxe = 0;
      this.commande.ligneCommandes.forEach((element) => {
        if (element.quantite > 0 && element.article != null) {
          if (element.remise > 0) {
            this.commande.remise =
              this.commande.remise +
              (element.quantite * element.article.prix * element.remise) / 100;
            this.commande.totalHt =
              this.commande.totalHt +
              (element.quantite *
                element.article.prix *
                (100 - element.remise)) /
                100;
            this.commande.totalTaxe =
              this.commande.totalTaxe +
              (((element.quantite *
                element.article.prix *
                (100 - element.remise)) /
                100) *
                element.article.tva) /
                100;
          } else {
            this.commande.totalHt =
              this.commande.totalHt + element.quantite * element.article.prix;
            this.commande.totalTaxe =
              this.commande.totalTaxe +
              (element.quantite * element.article.prix * element.article.tva) /
                100;
          }
          this.commande.totalTtc =
            this.commande.totalHt + this.commande.totalTaxe;
        }
      });
    }
  }
}
