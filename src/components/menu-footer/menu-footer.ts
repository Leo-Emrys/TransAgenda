import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ListeTraitementsPage } from '../../pages/liste-traitements/liste-traitements';
import { OrdonnancesPage } from '../../pages/ordonnances/ordonnances';
import { StockPage } from '../../pages/stock/stock';
import { SuiviPage } from '../../pages/suivi/suivi';

@Component({
  selector: 'menu-footer',
  templateUrl: 'menu-footer.html'
})
export class MenuFooterComponent {

  //currentPage = "home";
  @Input() currentPage;

  constructor(private navCtrl: NavController) {
    console.log('Hello MenuFooterComponent Component');
  }

  goTo(page) {
    switch(page) {
      case 'home' : this.navCtrl.setRoot(ListeTraitementsPage); break;
      case 'ordos' : this.navCtrl.setRoot(OrdonnancesPage); break;
      case 'stocks' : this.navCtrl.setRoot(StockPage); break;
      case 'stats' : this.navCtrl.setRoot(SuiviPage); break;
    }
  }

}
