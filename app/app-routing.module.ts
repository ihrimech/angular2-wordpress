import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './frontpage/accueil.component';
import { DetailArticleComponent } from './articles/detail/detail-article.component';
import { ListArticlesComponent } from './articles/list/list-articles.component';
import { NotFoundComponent } from './transverse/not-found.component';

const routes: Routes = [
  { path: '', component: AccueilComponent },
  { path: 'article/:name-article', component: DetailArticleComponent },
  { path: 'list-articles/:category-slug', component: ListArticlesComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}