import { Component, Input, OnInit } from '@angular/core';
import { CardCategory } from './card-category';
import { CardCategoryService } from './card-category.service';

@Component({
    selector: 'card-category',
    templateUrl: 'app/transverse/card-category/card-category.component.html'
})
export class CardCategoryComponent implements OnInit {
    @Input("numberCards") numberCards: number;
    public cardCategory: CardCategory;
    public columnNumber : number = 12;

    constructor( 
        private cardCategoryService: CardCategoryService
    ) { }
    
    ngOnInit() { 
        this.getCards(this.numberCards);
    }

    getCards(numberCards: number){
        this.cardCategoryService
            .getCardCategoryList()
            .subscribe(cardsResponse => {
                if(cardsResponse.length <= numberCards){
                    this.numberCards = cardsResponse.length;
                }
                cardsResponse.splice(numberCards);
                this.adaptCards(cardsResponse);
            })
    }

    adaptCards(cards: any): void{
        this.cardCategory =  cards.map(function(card: any){
            return {
                title: card.title.rendered,
                body: card.content.rendered
            }
        })
        this.columnNumber = 12/this.numberCards;
    }
}