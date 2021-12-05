import { FactureDetailsComponent } from "./facture-details/facture-details.component";
import { CreateFactureComponent } from "./create-facture/create-facture.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { FactureListComponent } from "./facture-list/facture-list.component";
import { UpdateFactureComponent } from "./update-facture/update-facture.component";
import { GenererFactureComponent } from "./generer-facture/generer-facture.component";

const routes: Routes = [
  { path: "", component: FactureListComponent },
  { path: "add", component: CreateFactureComponent },
  { path: "update/:id", component: UpdateFactureComponent },
  { path: "details/:id", component: FactureDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FactureRoutingModule {}
