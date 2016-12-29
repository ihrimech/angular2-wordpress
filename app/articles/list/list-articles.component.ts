import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CATEGORIES } from './../../config/config';
import { ArticlesService } from './../articles.service';
import { DetailArticle } from './../article';

@Component({
    selector: 'list-articles',
    templateUrl: 'app/articles/list/list-articles.component.html'
})
export class ListArticlesComponent implements OnInit {
    @Input('showLastArticles') showLastArticles : boolean = false;
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
                    // retrieve articles from category
                    if(categorySlug == category.slug){
                        this.currentCategory = category.name;
                        this.setListArticles(category.id);
                    }
                });
            } else if(this.showLastArticles) {
                this.articleServices.getLastArticles()
                    .subscribe(listArticles => {
                        this.createListArticle(listArticles);
                    });
            };
        })
    }

    setListArticles(id: number){
        this.articleServices.getListArticles(id)
        .subscribe(listArticles => {
            this.createListArticle(listArticles);
        })
    }
    /**
     * fill list of article object
    */
    createListArticle(listArticles: any){
        let listArticleTemp = listArticles.map((article: any) => {
            return new DetailArticle(article.title.rendered, article.content.rendered, article.slug)
        })
        this.listArticles = listArticleTemp;
    }

    /**
     * Redirect to article detail page
    */
    goToArticle(article: DetailArticle){
        this.router.navigate(['/article', article._slug]);
    }
}