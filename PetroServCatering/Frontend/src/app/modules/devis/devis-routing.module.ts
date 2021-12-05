import { DevisDetailsComponent } from "./devis-details/devis-details.component";
import { CreateDevisComponent } from "./create-devis/create-devis.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DevisListComponent } from "./devis-list/devis-list.component";
import { UpdateDevisComponent } from "./update-devis/update-devis.component";

const routes: Routes = [
  { path: "", component: DevisListComponent },
  { path: "add", component: CreateDevisComponent },
  { path: "update/:id", component: UpdateDevisComponent },
  { path: "details/:id", component: DevisDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DevisRoutingModule {}
