import { Component, OnInit } from '@angular/core';
import { Image } from './image.interface';
import { Observable } from 'rxjs/Rx';

@Component({
    selector: 'slider',
    templateUrl: 'app/frontpage/slider/slider.component.html'
})
export class SliderComponent implements OnInit {
    constructor() { }
    public indexImgToShow: number = 0;
    public images :any = [
        {
            title:"Photography",
            url:"assets/img/venise_slider.jpg",
            meta:"Photo in black and white of a girl sitting by a river in venise",
            description:"Looking for a set of free photographies ?"

        },
        {
            title:"Tech",
            url:"assets/img/angular_slider.jpg",
            meta:"most technologies that are aborded in the website",
            description:"Some discoveries about the web techs"
        }
    ];
    
    ngOnInit() {
        this.applyStyle();
    }
    applyStyle(){
        let numberImages = this.images.length;
        Observable.timer(0, 4500).subscribe(t =>{
            if(this.indexImgToShow == (numberImages -1) ){
                this.indexImgToShow = 0;
            }else {
                this.indexImgToShow = this.indexImgToShow + 1;
            }
        })
    }
}