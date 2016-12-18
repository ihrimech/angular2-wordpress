export class DetailArticle {
    _title: string;
    _body:  string;
    _slug: string;

    constructor(title: string, body: string, slug: string){
        this._title = title;
        this._body = body;
        this._slug = slug;
    }
}
