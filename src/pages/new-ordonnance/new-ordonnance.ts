import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { OrdonnanceProvider } from '../../providers/ordonnance/ordonnance';
import { OrdonnancesPage } from '../ordonnances/ordonnances';
import { FonctionsCommunesProvider } from '../../providers/fonctions-communes/fonctions-communes';

@Component({
  selector: 'page-new-ordonnance',
  templateUrl: 'new-ordonnance.html',
})
export class NewOrdonnancePage {

  ordonnance = {};
  joursMois = "jours";

  constructor(public navCtrl: NavController, public navParams: NavParams, private ordosService: OrdonnanceProvider, private fonctions: FonctionsCommunesProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewOrdonnancePage');
  }

  creer() {
    if(this.joursMois=="mois") {
      this.ordonnance["duree"] = this.ordonnance["duree"]*30;
    }
    this.ordonnance['start_date'] = this.fonctions.toPrintDateFormat(new Date(this.ordonnance['start_date']));
    console.log(this.ordonnance, this.joursMois);
    this.ordosService.addNewOrdonnance(this.ordonnance).then((res) => {
      this.navCtrl.setRoot(OrdonnancesPage);
    })
  }

}
