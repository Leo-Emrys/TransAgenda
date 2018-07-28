import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { GererRappelsPage } from '../gerer-rappels/gerer-rappels';
import { GererZonesPage } from '../gerer-zones/gerer-zones';

@Component({
  selector: 'page-detail-traitement',
  templateUrl: 'detail-traitement.html',
})
export class DetailTraitementPage {

  traitement;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.traitement = this.navParams.get('traitement');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailTraitementPage');
  }

  gererZones() {
    this.navCtrl.push(GererZonesPage, {traitement: this.traitement});
  }

  gererRappels() {
    this.navCtrl.push(GererRappelsPage, {traitement: this.traitement});
  }

}
