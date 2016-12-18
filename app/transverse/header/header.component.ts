import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'header',
    templateUrl: 'app/transverse/header/header.component.html'
})
export class HeaderComponent implements OnInit {
    constructor(
        private router: Router
    ) { }

    ngOnInit() { }

    goHomePage(){
        this.router.navigate(['']);
    }
}