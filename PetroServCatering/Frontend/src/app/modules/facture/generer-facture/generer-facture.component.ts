import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Facture } from "src/app/core/Models/facture/facture";
import { Commande } from "src/app/core/Models/commande/commande";
import { FactureService } from "src/app/core/service/facture/facture.service";
import { CommandeService } from "src/app/core/service/Commande/commande.service";
import { User } from "src/app/core/models/user/userEntity";
import { TokenStorageService } from "src/app/Core/service/user-auth/token-storage.service";

@Component({
  selector: "app-generer-facture",
  templateUrl: "./generer-facture.component.html",
  styleUrls: ["./generer-facture.component.css"],
})
export class GenererFactureComponent implements OnInit {
  id: number;
  submitted = false;

  public commande: Commande = new Commande();
  public facture: Facture = new Facture();
  public currentUser: User = new User();

  options: FormGroup;
  hideRequiredControl = new FormControl(false);
  floatLabelControl = new FormControl("auto");

  constructor(
    private commandeService: CommandeService,
    private factureService: FactureService,
    private tokenStorageService: TokenStorageService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"];
    this.getInitFacture();
    this.commandeService.getCommande(this.id).subscribe(
      (data) => {
        console.log(data);
        this.commande = data;
        this.facture.totalHt = this.commande.totalHt;
        this.facture.totalTaxe = this.commande.totalTaxe;
        this.facture.totalTtc = this.commande.totalTtc + this.facture.timbre;
        this.facture.remise = this.commande.remise;
        this.facture.fournisseur = this.commande.fournisseur;
        this.facture.ligneFactures = this.commande.ligneCommandes;
        this.facture.ligneFactures.forEach((element) => {
          element.id = null;
        });
        this.facture.commande = this.commande;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getInitFacture() {
    this.factureService.getInitFacture().subscribe((res) => {
      this.facture = res;
      this.currentUser.id = this.tokenStorageService.getUser().id;
      this.facture.user = this.currentUser;
      this.facture.date = new Date(res.date.slice(0, 10));
      this.facture.timbre = 0.6;
      console.log(this.facture);
    });
  }

  onSubmit() {
    this.submitted = true;
    this.genererFacture();
    this.gotoList();
  }

  genererFacture() {
    console.log(this.facture);
    this.factureService.createFacture(this.facture).subscribe(
      (data) => {
        console.log(data);
        this.commandeService
          .facturerCommande(this.id, this.commande)
          .subscribe((data) => {
            console.log(data);
          });
      },
      (error) => console.log(error)
    );
  }

  gotoList() {
    this.router.navigate(["/factures"]);
  }
}
