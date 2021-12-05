import { MagasinDetailsComponent } from './magasin-details/magasin-details.component';
import { CreateMagasinComponent } from './create-magasin/create-magasin.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MagasinListComponent } from './magasin-list/magasin-list.component';
import { UpdateMagasinComponent } from './update-magasin/update-magasin.component';

const routes: Routes = [
  { path: '', component: MagasinListComponent },
  { path: 'add', component: CreateMagasinComponent },
  { path: 'update/:id', component: UpdateMagasinComponent },
  { path: 'details/:id', component: MagasinDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MagasinRoutingModule { }
