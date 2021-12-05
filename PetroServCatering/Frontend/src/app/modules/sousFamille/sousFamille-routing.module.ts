import { SousFamilleDetailsComponent } from './sousFamille-details/sousFamille-details.component';
import { CreateSousFamilleComponent } from './create-sousFamille/create-sousFamille.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SousFamilleListComponent } from './sousFamille-list/sousFamille-list.component';
import { UpdateSousFamilleComponent } from './update-sousFamille/update-sousFamille.component';

const routes: Routes = [
  { path: '', component: SousFamilleListComponent },
  { path: 'add', component: CreateSousFamilleComponent },
  { path: 'add/:idf', component: CreateSousFamilleComponent },
  { path: 'update/:id', component: UpdateSousFamilleComponent },
  { path: 'details/:id', component: SousFamilleDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SousFamilleRoutingModule { }
