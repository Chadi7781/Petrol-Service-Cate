import { CategorieDetailsComponent } from './categorie-details/categorie-details.component';
import { CreateCategorieComponent } from './create-categorie/create-categorie.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategorieListComponent } from './categorie-list/categorie-list.component';
import { UpdateCategorieComponent } from './update-categorie/update-categorie.component';

const routes: Routes = [
  { path: '', component: CategorieListComponent },
  { path: 'add', component: CreateCategorieComponent },
  { path: 'update/:id', component: UpdateCategorieComponent },
  { path: 'details/:id', component: CategorieDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategorieRoutingModule { }
