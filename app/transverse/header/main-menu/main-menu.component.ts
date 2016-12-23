import { Component, OnInit } from '@angular/core';
import { MainMenuService } from './main-menu.service';

@Component({
    selector: 'main-menu',
    templateUrl: 'app/transverse/header/main-menu/main-menu.component.html'
})
export class MainMenuComponent implements OnInit {
    constructor(
        private mainMenuService : MainMenuService
    ) { }
    public showMobileMenu:boolean = false;
    public categories;

    ngOnInit() { 
        this.mainMenuService.getListCategories().subscribe(
            categories => {
                this.setCategoryTree(categories);
            }
        );
    }
    
    setCategoryTree(categories :any){
        let parentCategories = categories.filter((category: any) => {
            if(category.parent === 0){
                return category;
            }
        });
        this.categories = parentCategories;
    }

    showMobileNavigation(){
        this.showMobileMenu = !this.showMobileMenu;
    }
}