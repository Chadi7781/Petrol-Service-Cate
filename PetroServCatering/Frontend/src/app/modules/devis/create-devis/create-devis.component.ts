import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { Article } from "src/app/core/Models/article/article";
import { Commande } from "src/app/core/Models/commande/commande";
import { Devis } from "src/app/core/Models/devis/devis";
import { LigneDevis } from "src/app/core/models/devis/ligneDevis";
import { Fournisseur } from "src/app/core/Models/fournisseur/fournisseur";
import { User } from "src/app/core/models/user/userEntity";
import { ArticleService } from "src/app/core/service/article/article.service";
import { CommandeService } from "src/app/core/service/commande/commande.service";
import { DevisService } from "src/app/core/service/Devis/devis.service";
import { LigneDevisService } from "src/app/core/service/Devis/ligneDevis.service";
import { FournisseurService } from "src/app/core/service/fournisseur/fournisseur.service";
import { TokenStorageService } from "src/app/Core/service/user-auth/token-storage.service";

@Component({
  selector: "app-create-devis",
  templateUrl: "./create-devis.component.html",
  styleUrls: ["./create-devis.component.css"],
})
export class CreateDevisComponent implements OnInit {
  devis: Devis = new Devis();
  submitted = false;
  idDevis: number;
  public fournisseur: Fournisseur = new Fournisseur();
  public fournisseurs: Fournisseur[] = [];
  public commandes: Commande[] = [];
  public articles: Article[] = [];
  public currentUser: User = new User();
  ligneDevis: LigneDevis = new LigneDevis();
  options: FormGroup;
  hideRequiredControl = new FormControl(false);
  floatLabelControl = new FormControl("auto");

  constructor(
    private devisService: DevisService,
    private ligneDevisService: LigneDevisService,
    private fournisseurService: FournisseurService,
    private commandeService: CommandeService,
    private articleService: ArticleService,
    private tokenStorageService: TokenStorageService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.getInitDevis();
    this.getAllFournisseur();
    this.getAllArticle();
    this.newDynamic = {};
    this.ligneDevisList.push(this.newDynamic);
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

  getInitDevis() {
    this.devisService.getInitDevis().subscribe((res) => {
      this.devis = res;
      this.devis.date = new Date(res.date.slice(0.1));
      this.currentUser.id = this.tokenStorageService.getUser().id;
      this.devis.user = this.currentUser;
      //this.devis.date = new Date(res.date.slice(0, 10));
    });
  }

  newDevis(): void {
    this.submitted = false;
    this.devis = new Devis();
  }

  save() {
    this.devis.ligneDevisList = [];
    this.ligneDevisList.forEach((element) => {
      if (element.remise > 0) {
        element.totalTaxe =
          (((element.quantite * element.article.prix * (100 - element.remise)) /
            100) *
            element.article.tva) /
          100;
        element.totalHt =
          (element.quantite * element.article.prix * (100 - element.remise)) /
          100;
        element.totalTtc = element.totalHt + element.totalTaxe;
      } else {
        element.totalTaxe =
          (element.quantite * element.article.prix * element.article.tva) / 100;
        element.totalHt = element.quantite * element.article.prix;
        element.totalTtc = element.totalHt + element.totalTaxe;
      }
      console.log("element", element);
      this.devis.ligneDevisList.push(element);
    });
    this.devis.ligneDevisList = this.ligneDevisList;
    this.devisService.createDevis(this.devis).subscribe(
      (date) => {},
      (error) => console.log(error)
    );
    this.gotoList();
  }

  onSubmit() {
    this.submitted = true;
    this.save();
  }

  gotoList() {
    this.router.navigate(["/devislist"]);
  }

  ligneDevisList: Array<LigneDevis> = [];
  newDynamic: any = {};

  addRow() {
    this.calculerDevis();
    this.newDynamic = {};
    this.ligneDevisList.push(this.newDynamic);
    console.log(this.ligneDevisList);
    return true;
  }

  deleteRow(index) {
    if (this.ligneDevisList.length == 1) {
      this._snackBar.open(
        "Vous ne pouvez pas supprimé la ligne quand il y a une seule ligne !",
        "Warning",
        {
          duration: 2000,
        }
      );
      return false;
    } else {
      this.ligneDevisList.splice(index, 1);
      this.calculerDevis();
      return true;
    }
  }

  calculerDevis() {
    if (
      this.ligneDevisList.length > 0 &&
      this.ligneDevisList[0].article != null
    ) {
      this.devis.totalHt = 0;
      this.devis.totalTtc = 0;
      this.devis.totalTaxe = 0;
      this.devis.remise = 0;
      this.ligneDevisList.forEach((element) => {
        if (element.quantite > 0 && element.article != null) {
          if (element.remise > 0) {
            this.devis.remise =
              this.devis.remise +
              (element.quantite * element.article.prix * element.remise) / 100;
            this.devis.totalHt =
              this.devis.totalHt +
              (element.quantite *
                element.article.prix *
                (100 - element.remise)) /
                100;
            this.devis.totalTaxe =
              this.devis.totalTaxe +
              (((element.quantite *
                element.article.prix *
                (100 - element.remise)) /
                100) *
                element.article.tva) /
                100;
          } else {
            this.devis.totalHt =
              this.devis.totalHt + element.quantite * element.article.prix;
            this.devis.totalTaxe =
              this.devis.totalTaxe +
              (element.quantite * element.article.prix * element.article.tva) /
                100;
          }
          this.devis.totalTtc = this.devis.totalHt + this.devis.totalTaxe;
        }
      });
    }
  }
}
