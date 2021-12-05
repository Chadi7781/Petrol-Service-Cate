import { BonReception } from "../../../core/models/bonReception/bonReception";
import { LigneReception } from "../../../core/models/bonReception/ligneReception";
import { Article } from "../../../core/models/article/article";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { FournisseurService } from "../../../core/service/fournisseur/fournisseur.service";
import { ArticleService } from "../../../core/service/article/article.service";
import { Fournisseur } from "../../../core/models/fournisseur/fournisseur";
import { FormControl, FormGroup } from "@angular/forms";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatSnackBar } from "@angular/material/snack-bar";
import { BonReceptionService } from "src/app/core/service/bonReception/bonReception.service";
import { LigneReceptionService } from "src/app/core/service/bonReception/ligneReception.service";
import { MagasinService } from "../../../core/service/magasin/magasin.service";
import { Magasin } from "src/app/core/Models/magasin/magasin";

@Component({
  selector: "app-update-bonReception",
  templateUrl: "./update-bonReception.component.html",
  styleUrls: ["./update-bonReception.component.css"],
})
export class UpdateBonReceptionComponent implements OnInit {
  id: number;
  bonReception: BonReception;
  submitted = false;
  idBonReception: number;
  public fournisseurs: Fournisseur[] = [];
  public magasins: Magasin[] = [];
  public articles: Article[] = [];
  ligneReception: LigneReception = new LigneReception();
  public ligneDeBonReceptions: LigneReception[] = [];
  options: FormGroup;
  hideRequiredControl = new FormControl(false);
  floatLabelControl = new FormControl("auto");

  constructor(
    private bonReceptionService: BonReceptionService,
    private ligneReceptionService: LigneReceptionService,
    private fournisseurService: FournisseurService,
    private magasinService: MagasinService,
    private articleService: ArticleService,
    private router: Router,
    private _snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) {}
  ngOnInit() {
    this.getAllFournisseur();
    this.getAllArticle();
    this.id = this.route.snapshot.params["id"];
    this.bonReceptionService.getBonReception(this.id).subscribe(
      (data) => {
        console.log(data);
        this.bonReception = data;
        this.bonReception.date = new Date(data.date.slice(0, 10));
      },
      (error) => console.log(error)
    );

    this.newDynamic = {};
    this.ligneReceptions.push(this.newDynamic);
  }

  getAllFournisseur() {
    this.fournisseurService.getFournisseursList().subscribe((res) => {
      this.fournisseurs = res;
    });
  }
  getAllMagasin() {
    this.magasinService.getMagasinsList().subscribe((res) => {
      this.magasins = res;
    });
  }

  getAllArticle() {
    this.articleService.getArticlesList().subscribe((res) => {
      this.articles = res;
    });
  }

  newBonReception(): void {
    this.submitted = false;
    this.bonReception = new BonReception();
  }

  save() {
    this.bonReception.ligneReceptions.forEach((element) => {
      element.tva = element.article.tva;
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
      this.bonReception.ligneReceptions.push(element);
    });
    this.bonReception.ligneReceptions = this.ligneReceptions;
    console.log(this.bonReception);
    this.bonReceptionService.createBonReception(this.bonReception).subscribe(
      (data) => {},
      (error) => console.log(error)
    );
    this.gotoList();
  }

  onSubmit() {
    this.bonReception = new BonReception();

    this.id = this.route.snapshot.params["id"];

    this.bonReceptionService.getBonReception(this.id).subscribe(
      (data) => {
        console.log(data);
        this.bonReception = data;
      },
      (error) => console.log(error)
    );
    this.submitted = true;
    this.updateBonReception();
  }

  updateBonReception() {
    this.bonReceptionService
      .updateBonReception(this.id, this.bonReception)
      .subscribe(
        (data) => {
          console.log(data);
          this.bonReception = new BonReception();
          this.gotoList();
        },
        (error) => console.log(error)
      );
  }

  gotoList() {
    this.router.navigate(["/bonReceptions"]);
  }

  ligneReceptions: Array<LigneReception> = [];
  newDynamic: any = {};

  addRow() {
    this.calculerBonReception();
    this.newDynamic = {};
    this.bonReception.ligneReceptions.push(this.newDynamic);
    return true;
  }

  deleteRow(index) {
    this.calculerBonReception();
    if (this.bonReception.ligneReceptions.length == 1) {
      this._snackBar.open(
        "Vous ne pouvez pas supprimé la ligne quand il y a une seule ligne !",
        "Warning",
        {
          duration: 2000,
        }
      );
      return false;
    } else {
      this.bonReception.ligneReceptions.splice(index, 1);
      return true;
    }
  }
  calculerBonReception() {
    if (
      this.bonReception.ligneReceptions.length > 0 &&
      this.bonReception.ligneReceptions[0].article != null
    ) {
      this.bonReception.totalHt = 0;
      this.bonReception.remise = 0;
      this.bonReception.totalTtc = 0;
      this.bonReception.totalTaxe = 0;
      this.bonReception.ligneReceptions.forEach((element) => {
        if (element.quantite > 0 && element.article != null) {
          if (element.remise > 0) {
            this.bonReception.remise =
              this.bonReception.remise +
              (element.quantite * element.article.prix * element.remise) / 100;
            this.bonReception.totalHt =
              this.bonReception.totalHt +
              (element.quantite *
                element.article.prix *
                (100 - element.remise)) /
                100;
            this.bonReception.totalTaxe =
              this.bonReception.totalTaxe +
              (((element.quantite *
                element.article.prix *
                (100 - element.remise)) /
                100) *
                element.article.tva) /
                100;
          } else {
            this.bonReception.totalHt =
              this.bonReception.totalHt +
              element.quantite * element.article.prix;
            this.bonReception.totalTaxe =
              this.bonReception.totalTaxe +
              (element.quantite * element.article.prix * element.article.tva) /
                100;
          }
          this.bonReception.totalTtc =
            this.bonReception.totalHt + this.bonReception.totalTaxe;
        }
      });
    }
    console.log(this.bonReception);
  }
}
