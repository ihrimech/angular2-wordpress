import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `<header></header><div class="main-content">
            <router-outlet></router-outlet>
            </div>
            <footer-detail></footer-detail>`,
})
export class AppComponent  { 
  name = 'Just live it'; 
}
