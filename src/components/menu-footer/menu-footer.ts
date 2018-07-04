import { Component } from '@angular/core';

/**
 * Generated class for the MenuFooterComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'menu-footer',
  templateUrl: 'menu-footer.html'
})
export class MenuFooterComponent {

  currentPage = "home";

  constructor() {
    console.log('Hello MenuFooterComponent Component');
  }

  goTo(page) {
    this.currentPage = page;
  }

}
