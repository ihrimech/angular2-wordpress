import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { configURLs, PATHSSERVICES } from './../config/config';

@Injectable()
export class ArticlesService {
    private URLbackend = configURLs.development.backend.scheme + "://"
                + configURLs.development.backend.url + ":"
                + configURLs.development.backend.port
                + configURLs.development.backend.path;
    constructor(
        private http : Http
    ) { }

    public getArticleBySlug(slug: string): Observable<any>{
        let params = new URLSearchParams();
        params.set('slug', slug);
        return this.http
            .get(this.URLbackend + "/" + PATHSSERVICES.posts.path,  { search: params })
            .map(this.extractData)
            .catch(this.handleError);
    }
    
     /**
     * Get the list of articles of a specific category
     */
    public getListArticles(categoryId: number): Observable<any>{
        let params = new URLSearchParams();
        params.set('categories', categoryId.toString());
        return this.http
            .get(this.URLbackend + "/" + PATHSSERVICES.posts.path,  { search: params })
            .map(this.extractData)
            .catch(this.handleError);

    }
     /**
     * Get the list of last articles published
     */
    public getLastArticles(): Observable<any>{
        let params = new URLSearchParams();
        params.set('per_page', '5');
        return this.http
            .get(this.URLbackend + "/" + PATHSSERVICES.posts.path,  { search: params })
            .map(this.extractData)
            .catch(this.handleError);

    }

    private extractData(res: Response) {
        let data = JSON.parse(res['_body']);
        return data || { };
    }

      private handleError (error: Response | any) {
        // TODO In a real world app, we might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }    
}