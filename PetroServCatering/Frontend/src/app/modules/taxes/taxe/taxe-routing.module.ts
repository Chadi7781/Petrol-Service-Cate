import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TaxeListComponent} from '../taxe-list/taxe-list.component';
import { UpdateTaxeComponent } from '../update-taxe/update-taxe.component';
import { TaxesDetailsComponent } from '../taxes-details/taxes-details.component';
import { CreateTaxeComponent } from '../create-taxe/create-taxe.component';

const routes: Routes = [
  { path: '', component: TaxeListComponent },
  { path: 'add', component: CreateTaxeComponent },
  { path: 'update/:id', component: UpdateTaxeComponent },
  { path: 'details/:id', component: TaxesDetailsComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaxeRoutingModule { }
