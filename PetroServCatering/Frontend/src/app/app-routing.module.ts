import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PageLayoutComponent } from "./Core/page-layout/page-layout.component";
import { AddUserComponent } from "./add-user/add-user.component";
import { LoginComponent } from "./core/login/login.component";
import { RegisterComponent } from "./core/register/register.component";
import { ProfileComponent } from "./core/profile/profile.component";

const routes: Routes = [
    { path: 'magasins', loadChildren: () => import('./modules/magasin/magasin.module').then(m => m.MagasinModule) },
  { path: 'devises', loadChildren: () => import('./modules/devise/devise.module').then(m => m.DeviseModule) },
  { path: 'familles', loadChildren: () => import('./modules/famille/famille.module').then(m => m.FamilleModule) },
  { path: 'sousfamilles', loadChildren: () => import('./modules/sousFamille/sousFamille.module').then(m => m.SousFamilleModule) },
  { path: 'clients', loadChildren: () => import('./modules/client/client.module').then(m => m.ClientModule) },
  { path: 'typeArticles', loadChildren: () => import('./modules/typeArticle/typeArticle.module').then(m => m.TypeArticleModule) },

  { path: 'categories', loadChildren: () => import('./modules/categorie/categorie.module').then(m => m.CategorieModule) },
  {
    path: "magasins",
    loadChildren: () =>
      import("./modules/magasin/magasin.module").then((m) => m.MagasinModule),
  },
  {
    path: "taxes",
    loadChildren: () =>
      import("./modules/taxes/taxe/taxe.module").then((t) => t.TaxeModule),
  },
  {
    path: "commandes",
    loadChildren: () =>
      import("./modules/commande/commande.module").then(
        (m) => m.CommandeModule
      ),
  },
  {
    path: "bonReceptions",
    loadChildren: () =>
      import("./modules/bonReception/bonReception.module").then(
        (m) => m.BonReceptionModule
      ),
  },
  {
    path: "factures",
    loadChildren: () =>
      import("./modules/facture/facture.module").then((m) => m.FactureModule),
  },
  {
    path: "fournisseurs",
    loadChildren: () =>
      import("./modules/fournisseur/fournisseur.module").then(
        (m) => m.FournisseurModule
      ),
  },
  {
    path: "articles",
    loadChildren: () =>
      import("./modules/articles/article.module").then((m) => m.ArticleModule),
  },
  {
    path: "employees",
    loadChildren: () =>
      import("./modules/employee/employee.module").then(
        (m) => m.EmployeeModule
      ),
  },
  {
    path: "devislist",
    loadChildren: () =>
      import("././modules/devis/devis.module").then((m) => m.DevisModule),
  },

  { path: "addUser/:id", component: AddUserComponent },
  { path: "pageLayout", component: PageLayoutComponent },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "profile", component: ProfileComponent },
  { path: "", redirectTo: "login", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: "legacy" })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
