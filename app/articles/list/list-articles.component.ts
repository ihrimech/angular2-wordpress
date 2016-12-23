import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { CATEGORIES } from './../../config/config';
import { ArticlesService } from './../articles.service';
import { DetailArticle } from './../article';

@Component({
    selector: 'list-articles',
    templateUrl: 'app/articles/list/list-articles.component.html'
})
export class ListArticlesComponent implements OnInit {
    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private articleServices: ArticlesService
    ) { }
    public listCategories = CATEGORIES;
    public listArticles: [DetailArticle];
    public currentCategory : string ;

    ngOnInit() {
        this.route.params.subscribe(param => {
            if(param['category-slug'] != null){
                let categorySlug = param['category-slug'];
                let idCategory = this.listCategories.filter( (category) => {
                    if(categorySlug == category.slug){
                        this.currentCategory = category.name;
                        this.setListArticle(category.id);
                    }
                });
            };
        })
     }

     setListArticle(id: number){
         this.articleServices.getListArticles(id)
            .subscribe(listArticles => {
                let listArticleTemp = listArticles.map((article: any) => {
                    return new DetailArticle(article.title.rendered, article.content.rendered, article.slug)
                })
                this.listArticles = listArticleTemp;
            })
     }

     goToArticle(article: DetailArticle){
         console.log(article)
         this.router.navigate(['/article', article._slug]);
     }
}