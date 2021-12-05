import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Commande } from "src/app/core/Models/commande/commande";
import { Devis } from "src/app/core/Models/devis/devis";
import { CommandeService } from "src/app/core/service/commande/commande.service";
import { DevisService } from "src/app/core/service/Devis/devis.service";

@Component({
  selector: "app-generer-commande",
  templateUrl: "./generer-commande.component.html",
  styleUrls: ["./generer-commande.component.css"],
})
export class GenererCommandeComponent implements OnInit {
  id: number;
  submitted = false;

  public devis: Devis = new Devis();
  public commande: Commande = new Commande();

  options: FormGroup;
  hideRequiredControl = new FormControl(false);
  floatLabelControl = new FormControl("auto");

  constructor(
    private devisService: DevisService,
    private commandeService: CommandeService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"];
    this.commandeService.getInitCommande().subscribe(
      (data) => {
        console.log(data);
        this.commande = data;
      },
      (error) => console.log(error)
    );
    this.devisService.getDevis(this.id).subscribe((data) => {
      console.log(data);
      this.devis = data;
      this.commande.totalHt = data.totalHt;
      this.commande.totalTaxe = data.totalTaxe;
      this.commande.totalTtc = data.totalTtc;
      this.commande.remise = data.remise;
      this.commande.fournisseur = data.fournisseur;
      this.commande.ligneCommandes = data.ligneDevisList;
      this.commande.devis = data;
    });
  }

  onSubmit() {
    this.submitted = true;
    this.genererCommande();
    this.gotoList();
  }

  genererCommande() {
    this.commandeService.createCommande(this.commande).subscribe(
      (data) => {
        console.log(data);
        this.devisService
          .commanderDevis(this.id, this.devis)
          .subscribe((data) => {
            console.log(data);
          });
      },
      (error) => console.log(error)
    );
  }

  gotoList() {
    this.router.navigate(["/commandes"]);
  }
}
