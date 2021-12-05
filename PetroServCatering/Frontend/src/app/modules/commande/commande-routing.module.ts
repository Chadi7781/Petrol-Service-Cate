import { CommandeDetailsComponent } from "./commande-details/commande-details.component";
import { CreateCommandeComponent } from "./create-commande/create-commande.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CommandeListComponent } from "./commande-list/commande-list.component";
import { UpdateCommandeComponent } from "./update-commande/update-commande.component";
import { CommandeValiderComponent } from "./commande-valider/commande-valider.component";
import { GenererCommandeComponent } from "./generer-commande/generer-commande.component";
import { GenererFactureComponent } from "../facture/generer-facture/generer-facture.component";

const routes: Routes = [
  { path: "", component: CommandeListComponent },
  { path: "add", component: CreateCommandeComponent },
  { path: "update/:id", component: UpdateCommandeComponent },
  { path: "details/:id", component: CommandeDetailsComponent },
  { path: "valider/:id", component: CommandeValiderComponent },
  { path: "generer/:id", component: GenererCommandeComponent },
  { path: "generer-facture-service/:id", component: GenererFactureComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommandeRoutingModule {}
