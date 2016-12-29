import { Component, OnInit } from '@angular/core';
import { configDisplay } from './../config/display';
@Component({
    selector: 'accueil',
    templateUrl: 'app/frontpage/accueil.component.html'
})
export class AccueilComponent implements OnInit {
    constructor() { }
    
    public displayOptions = configDisplay;

    ngOnInit() { }
}