import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent }  from './app.component';
import { AccueilComponent } from './frontpage/accueil.component';
import { MainMenuComponent } from './transverse/header/main-menu/main-menu.component';
import { HeaderComponent } from './transverse/header/header.component';
import { SliderComponent } from './frontpage/slider/slider.component';
import { CardCategoryComponent } from './transverse/card-category/card-category.component';
import { FooterDetailComponent } from './transverse/footer/footer.component';
import { DetailArticleComponent } from './articles/detail/detail-article.component';
import { ListArticlesComponent } from './articles/list/list-articles.component';
import { NotFoundComponent } from './transverse/not-found.component';

import { CardCategoryService } from './transverse/card-category/card-category.service';
import { ArticlesService } from './articles/articles.service';

@NgModule({
  imports:[ 
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  declarations: [ 
    AppComponent,
    AccueilComponent,
    MainMenuComponent,
    HeaderComponent,
    SliderComponent,
    CardCategoryComponent,
    FooterDetailComponent,
    DetailArticleComponent,
    ListArticlesComponent,
    NotFoundComponent
  ],
  providers: [
    CardCategoryService, 
    ArticlesService
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
