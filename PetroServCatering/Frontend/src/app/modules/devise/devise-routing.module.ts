import { DeviseDetailsComponent } from './devise-details/devise-details.component';
import { CreateDeviseComponent } from './create-devise/create-devise.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DeviseListComponent } from './devise-list/devise-list.component';
import { UpdateDeviseComponent } from './update-devise/update-devise.component';

const routes: Routes = [
  { path: '', component: DeviseListComponent },
  { path: 'add', component: CreateDeviseComponent },
  { path: 'update/:id', component: UpdateDeviseComponent },
  { path: 'details/:id', component: DeviseDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeviseRoutingModule { }
