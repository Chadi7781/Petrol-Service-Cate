import { TypeArticleDetailsComponent } from './typeArticle-details/typeArticle-details.component';
import { CreateTypeArticleComponent } from './create-typeArticle/create-typeArticle.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TypeArticleListComponent } from './typeArticle-list/typeArticle-list.component';
import { UpdateTypeArticleComponent } from './update-typeArticle/update-typeArticle.component';

const routes: Routes = [
  { path: '', component: TypeArticleListComponent },
  { path: 'add', component: CreateTypeArticleComponent },
  { path: 'update/:id', component: UpdateTypeArticleComponent },
  { path: 'details/:id', component: TypeArticleDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TypeArticleRoutingModule { }
