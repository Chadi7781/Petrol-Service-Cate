import { Devis } from "../../../core/models/devis/devis";
import { LigneDevis } from "../../../core/models/devis/ligneDevis";
import { Article } from "../../../core/models/article/article";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { FournisseurService } from "../../../core/service/fournisseur/fournisseur.service";
import { ArticleService } from "../../../core/service/article/article.service";
import { Fournisseur } from "../../../core/models/fournisseur/fournisseur";
import { FormControl, FormGroup } from "@angular/forms";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatTableDataSource } from "@angular/material/table";
import { MatSnackBar } from "@angular/material/snack-bar";
import { DevisService } from "src/app/core/service/devis/devis.service";
import { LigneDevisService } from "src/app/core/service/devis/ligneDevis.service";

@Component({
  selector: "app-update-devis",
  templateUrl: "./update-devis.component.html",
  styleUrls: ["./update-devis.component.css"],
})
export class UpdateDevisComponent implements OnInit {
  id: number;
  devis: Devis;
  submitted = false;
  idDevis: number;
  selectedFournisseur: any;
  public selectedArticles: number[] = [];
  public fournisseurs: Fournisseur[] = [];
  public articles: Article[] = [];
  public selectedArticle: number;
  public ligneDevis: LigneDevis[] = [];
  date: Date;
  options: FormGroup;
  hideRequiredControl = new FormControl(false);
  floatLabelControl = new FormControl("auto");

  constructor(
    private devisService: DevisService,
    private ligneDevisService: LigneDevisService,
    private fournisseurService: FournisseurService,
    private articleService: ArticleService,
    private router: Router,
    private _snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) {}
  ngOnInit() {
    this.devis = new Devis();
    this.getAllFournisseur();
    this.getAllArticle();
    this.id = this.route.snapshot.params["id"];
    this.devisService.getDevis(this.id).subscribe(
      (data) => {
        console.log(data);
        this.date = new Date(data.date.slice(0, 10));
        this.devis = data;
        this.devis.date = this.date;
        //this.devis.date = data.date.slice(0, 10);
        //this.devis.date = new Date(data.date.slice(0, 10));
        //this.selectedFournisseur = this.devis.fournisseur.id;
        this.devis.ligneDevisList.forEach((element) => {
          this.selectedArticles.push(element.article.id);
          this.newDynamic = {};
          this.ligneDevisList.push(this.newDynamic);
        });
        console.log(this.selectedArticles);
      },
      (error) => console.log(error)
    );

    // this.newDynamic = {};
    // this.ligneDevisList.push(this.newDynamic);
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

  newDevis(): void {
    this.submitted = false;
    this.devis = new Devis();
  }

  // save() {
  //   this.devis.ligneDevisList = [];
  //   this.ligneDevisList.forEach((element) => {
  //     element.totalTaxe =
  //       (element.quantite * element.article.prix * element.article.tva) / 100;
  //     element.totalHt = element.quantite * element.article.prix;
  //     element.totalTtc = element.totalHt + element.totalTaxe;
  //     console.log("element", element);
  //     this.devis.ligneDevisList.push(element);
  //   });
  //   this.devis.ligneDevisList = this.ligneDevisList;
  //   this.devisService.createDevis(this.devis).subscribe(
  //     (data) => {},
  //     (error) => console.log(error)
  //   );
  //   this.gotoList();
  // }

  onSubmit() {
    //this.devis = new Devis();

    //this.id = this.route.snapshot.params["id"];

    // this.devisService.getDevis(this.id).subscribe(
    //   (data) => {
    //     console.log(data);
    //     this.devis = data;
    //     console.log(this.devis);
    //     console.log(this.devis.date);
    //   },
    //   (error) => console.log(error)
    // );
    // this.submitted = true;
    // console.log(this.devis);
    this.updateDevis();
  }

  updateDevis() {
    this.devisService.updateDevis(this.id, this.devis).subscribe(
      (data) => {
        console.log(this.devis);
        console.log(data);
        this.gotoList();
      },
      (error) => console.log(error)
    );
  }

  gotoList() {
    this.router.navigate(["/devislist"]);
  }

  ligneDevisList: Array<LigneDevis> = [];
  newDynamic: any = {};

  addRow() {
    //this.calculerDevis();
    this.newDynamic = {};
    console.log(this.newDynamic);

    this.devis.ligneDevisList.push(this.newDynamic);
    console.log(this.ligneDevisList);
    return true;
  }

  deleteRow(index) {
    this.ligneDevisList = this.devis.ligneDevisList;
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
      //  this.toastr.warning('Row deleted successfully', 'Delete row');
      return true;
    }
  }

  onChange() {
    this.selectedFournisseur = this.devis.fournisseur.id;
    console.log(this.selectedFournisseur);
    console.log(this.devis.ligneDevisList);
    console.log(this.ligneDevis);
  }
  calculerDevis() {
    console.log("change********");
    console.log(this.devis);
    // if (
    //   this.ligneDevisList.length > 0 &&
    //   this.ligneDevisList[0].article != null
    // ) {
    //   this.devis.totalHt = 0;
    //   this.devis.totalTtc = 0;
    //   this.devis.totalTaxe = 0;
    //   this.ligneDevisList.forEach((element) => {
    //     if (element.quantite > 0 && element.article != null) {
    //       this.devis.totalHt =
    //         this.devis.totalHt + element.quantite * element.article.prix;
    //       this.devis.totalTaxe =
    //         this.devis.totalTaxe +
    //         (element.quantite * element.article.prix * element.article.tva) /
    //           100;
    //       this.devis.totalTtc = this.devis.totalHt + this.devis.totalTaxe;
    //     }
    //   });
    if (
      this.devis.ligneDevisList.length > 0 &&
      this.devis.ligneDevisList[0].article != null
    ) {
      this.devis.totalHt = 0;
      this.devis.remise = 0;
      this.devis.totalTtc = 0;
      this.devis.totalTaxe = 0;
      this.devis.ligneDevisList.forEach((element) => {
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
    console.log(this.devis);
  }
}
