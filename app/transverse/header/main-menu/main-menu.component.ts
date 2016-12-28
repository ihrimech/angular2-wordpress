import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MainMenuService } from './main-menu.service';

@Component({
    selector: 'main-menu',
    templateUrl: 'app/transverse/header/main-menu/main-menu.component.html'
})
export class MainMenuComponent implements OnInit {
    constructor(
        private mainMenuService : MainMenuService,
        private route: ActivatedRoute
    ) { }
    public showMobileMenu:boolean = false;
    public categories;
    public childrenCategory: boolean = false;
    public currentCategory: string = "";

    ngOnInit() { 
        this.mainMenuService.getListCategories().subscribe(
            categories => {
                this.setCategoryTree(categories);
            }
        );
    }

    
    setCategoryTree(categories :any){
        let childrenCategories = [];
        // filter on parent categories
        let parentCategories = categories.filter((category: any) => {
            if(category.parent === 0){
                return category;
            }else {
                childrenCategories.push(category);
            }
        });
        this.categories = parentCategories;
    }

    showMobileNavigation(){
        this.showMobileMenu = !this.showMobileMenu;
    }
}