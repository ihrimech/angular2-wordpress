import { Component, OnInit, trigger, state, style, transition, animate } from '@angular/core';
import { Image } from './image.interface';
import { Observable } from 'rxjs/Rx';

@Component({
    selector: 'slider',
    templateUrl: 'app/frontpage/slider/slider.component.html',
    animations: [
        trigger('imgState', [
            state('in', style({transform: 'translateX(0)'})),
            state('void', style({transform: 'translateX(-100%)'})),
            transition('void => in', [
                style({transform: 'translateX(-100%)'}),
                animate(600)
            ]),
            transition('in => void', [
                animate(600, style({transform: 'translateX(100%)'}))
            ])
        ])
    ]
})
export class SliderComponent implements OnInit {
    constructor() { }
    public indexImgToShow: number = 0;
    public images: any = [
        {
            title:"Photography",
            url:"assets/img/venise_slider.jpg",
            meta:"Photo in black and white of a girl sitting by a river in venise",
            description:"Looking for a set of free photographies ?",
            link:"list-articles/photography"
        },
        {
            title:"Tech",
            url:"assets/img/angular_slider.jpg",
            meta:"most technologies that are aborded in the website",
            description:"Some discoveries about the web techs",
            link:"list-articles/back-end"
        }
    ];
    
    ngOnInit() {
        this.applyStyle();
    }
    applyStyle(){
        let numberImages = this.images.length;
        Observable.timer(0, 4500).subscribe(t =>{
            // hide image
            this.images[this.indexImgToShow].state = "void";
            if(this.indexImgToShow == (numberImages -1) ){
                this.indexImgToShow = 0;
            }else {
                this.indexImgToShow = this.indexImgToShow + 1;
            }
            // show next image
            this.images[this.indexImgToShow].state = "in";
        })
    }
}