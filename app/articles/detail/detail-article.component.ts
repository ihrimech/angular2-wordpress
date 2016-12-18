import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { DetailArticle } from './../article';
import { ArticlesService } from './../articles.service';

@Component({
    selector: 'detail-article',
    templateUrl: 'app/articles/detail/detail-article.component.html'
})
export class DetailArticleComponent implements OnInit {
    constructor(
        private route: ActivatedRoute,
        private articleService: ArticlesService,
    ) { }

    private articleDetail: DetailArticle;

    ngOnInit() { 
        if(this.route.params['_value']['name-article'] != null){
            let slugArticle = this.route.params['_value']['name-article'];
            this.articleService.getArticleBySlug(slugArticle)
                .subscribe(article => {
                    console.log(article);
                    this.articleDetail = new DetailArticle(article[0].title.rendered, article[0].content.rendered, article[0].slug)
                })
        }
    }
}