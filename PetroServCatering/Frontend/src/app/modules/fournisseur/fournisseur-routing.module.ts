import { FournisseurDetailsComponent } from './fournisseur-details/fournisseur-details.component';
import { CreateFournisseurComponent } from './create-fournisseur/create-fournisseur.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FournisseurListComponent } from './fournisseur-list/fournisseur-list.component';
import { UpdateFournisseurComponent } from './update-fournisseur/update-fournisseur.component';

const routes: Routes = [
  { path: '', component: FournisseurListComponent },
  { path: 'add', component: CreateFournisseurComponent },
  { path: 'update/:id', component: UpdateFournisseurComponent },
  { path: 'details/:id', component: FournisseurDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FournisseurRoutingModule { }
