import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { configURLs, PATHSSERVICES } from './../../../config/config';

@Injectable()
export class MainMenuService {
    private URLbackend = configURLs.development.backend.scheme + "://"
                + configURLs.development.backend.url + ":"
                + configURLs.development.backend.port;

     constructor(
        private http : Http
    ) { }

    getListCategories(){
        let categories = localStorage.getItem("categories")
        if(categories == null){
            return this.http
                    .get(this.URLbackend + "/" + PATHSSERVICES.categories.path)
                    .map(this.extractDataToLocalStorage)
                    .catch(this.handleError);
        } else {
            let objCategories = JSON.parse(categories);
            return Observable.create( observer => {
                observer.next(objCategories);
                observer.complete();
            })
        }
    }

    private extractDataToLocalStorage(res: Response) {
        let categoriesArr = JSON.parse(res['_body']);
        let data =  categoriesArr.map(
            categoryRaw => {
                let temp_cat = {
                    id      : categoryRaw.id,
                    slug    : categoryRaw.slug,
                    name    : categoryRaw.name,
                    parent  : categoryRaw.parent
                };
                return temp_cat;
            }
        );

        localStorage.setItem("categories", JSON.stringify(data));
        return data || null;
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