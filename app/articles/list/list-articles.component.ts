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
    public listArticles: [DetailArticle];
    public currentCategory : string ;
    public secondaryMenu: any;

    ngOnInit() {
        // get list of articles corresponding to the actual page
        this.route.params.subscribe(param => {
            if(param['category-slug'] != null){
                // from the URL, the last parameter correponds to the slug of the category.
                // query from it
                let categorySlug = param['category-slug'];
                let categories = JSON.parse(localStorage.getItem('categories'));
                let idCategory = categories.filter( (category) => {
                    if(categorySlug == category.slug){
                        this.currentCategory = category.name;
                        this.setListArticles(category.id);
                        if(category.parent === 0) {
                            // look for child categories
                            this.setSecondaryMenu(category.id, categories);
                        }
                    }
                });
            };
        })
     }
     setSecondaryMenu(id: number, categories: any){
         let childrenEntries = categories.filter( (category: any) => {
             if(category.parent === id){
                 return category;
             }
         })
         this.secondaryMenu = childrenEntries;
     }

     setListArticles(id: number){
         this.articleServices.getListArticles(id)
            .subscribe(listArticles => {
                let listArticleTemp = listArticles.map((article: any) => {
                    return new DetailArticle(article.title.rendered, article.content.rendered, article.slug)
                })
                this.listArticles = listArticleTemp;
            })
     }

     redirectTo(slug: string){
         this.router.navigate(['/list-articles', slug]);
     }

     goToArticle(article: DetailArticle){
         this.router.navigate(['/article', article._slug]);
     }
}