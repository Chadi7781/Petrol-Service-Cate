import { Devis } from "../../../core/models/devis/devis";
import { Component, OnInit, Input } from "@angular/core";
import { DevisService } from "src/app/core/service/devis/devis.service";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";

@Component({
  selector: "app-devis-details",
  templateUrl: "./devis-details.component.html",
  styleUrls: ["./devis-details.component.css"],
})
export class DevisDetailsComponent implements OnInit {
  id: number;
  devis: Devis;
  options: FormGroup;
  hideRequiredControl = new FormControl(false);
  floatLabelControl = new FormControl("auto");

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private devisService: DevisService
  ) {}

  ngOnInit() {
    this.devis = new Devis();

    this.id = this.route.snapshot.params["id"];

    this.devisService.getDevis(this.id).subscribe(
      (data) => {
        console.log(data);
        this.devis = data;
        this.devis.date = data.date.slice(0, 10);
        console.log(this.devis.fournisseur);
      },
      (error) => console.log(error)
    );
  }

  list() {
    this.router.navigate(["devislist"]);
  }
}
