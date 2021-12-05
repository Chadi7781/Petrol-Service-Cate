import { BonReceptionDetailsComponent } from './bonReception-details/bonReception-details.component';
import { CreateBonReceptionComponent } from './create-bonReception/create-bonReception.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BonReceptionListComponent } from './bonReception-list/bonReception-list.component';
import { UpdateBonReceptionComponent } from './update-bonReception/update-bonReception.component';

const routes: Routes = [
 { path: '', component: BonReceptionListComponent },
 { path: 'add', component: CreateBonReceptionComponent },
 { path: 'update/:id', component: UpdateBonReceptionComponent },
 { path: 'details/:id', component: BonReceptionDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BonReceptionRoutingModule { }
