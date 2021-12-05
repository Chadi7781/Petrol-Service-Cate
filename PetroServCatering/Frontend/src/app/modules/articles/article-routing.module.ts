import { ArticleDetailsComponent } from './article-details/article-details.component';
import { CreateArticleComponent } from './create-article/create-article.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArticleListComponent } from './article-list/article-list.component';
import { UpdateArticleComponent } from './update-article/update-article.component';

const routes: Routes = [
  { path: '', component: ArticleListComponent },
  { path: 'add', component: CreateArticleComponent },
  { path: 'update/:id', component: UpdateArticleComponent },
  { path: 'details/:id', component: ArticleDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticleRoutingModule { }
