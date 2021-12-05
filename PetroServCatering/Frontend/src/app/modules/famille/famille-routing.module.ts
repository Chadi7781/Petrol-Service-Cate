import { FamilleDetailsComponent } from './famille-details/famille-details.component';
import { CreateFamilleComponent } from './create-famille/create-famille.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FamilleListComponent } from './famille-list/famille-list.component';
import { UpdateFamilleComponent } from './update-famille/update-famille.component';

const routes: Routes = [
  { path: '', component: FamilleListComponent },
  { path: 'add', component: CreateFamilleComponent },
  { path: 'update/:id', component: UpdateFamilleComponent },
  { path: 'details/:id', component: FamilleDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FamilleRoutingModule { }
