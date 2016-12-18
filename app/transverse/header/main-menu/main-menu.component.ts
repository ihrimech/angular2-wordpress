import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'main-menu',
    templateUrl: 'app/transverse/header/main-menu/main-menu.component.html'
})
export class MainMenuComponent implements OnInit {
    constructor() { }
    public showMobileMenu:boolean = false;
    ngOnInit() { }

    showMobileNavigation(){
        this.showMobileMenu = !this.showMobileMenu;
    }
}