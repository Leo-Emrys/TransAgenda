import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { NewOrdonnancePage } from '../new-ordonnance/new-ordonnance';
import { OrdonnanceProvider } from '../../providers/ordonnance/ordonnance';
import { FonctionsCommunesProvider } from '../../providers/fonctions-communes/fonctions-communes';

@Component({
  selector: 'page-ordonnances',
  templateUrl: 'ordonnances.html',
})
export class OrdonnancesPage {

  ordonnances;

  constructor(public navCtrl: NavController, public navParams: NavParams, private ordosService: OrdonnanceProvider, private fonctions: FonctionsCommunesProvider) {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrdonnancesPage');
    this.ordosService.getOrdonnances().then((result) => {
      this.ordonnances = result;
      this.ordonnances.forEach(ordo => {
        let date = this.fonctions.toDateFormat(ordo.start_date);
        let nextDate = new Date(date.setTime(new Date(date).getTime() + ordo.duree * 86400000));
        console.log('date fin', nextDate);
        ordo.end_date = this.fonctions.toPrintDateFormat(nextDate);
      });
    })
  }

  newOrdo() {
    this.navCtrl.push(NewOrdonnancePage);
  }

  voirDetail(ordo) {
    
  }

}
