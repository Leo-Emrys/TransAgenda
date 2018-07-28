import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-gerer-rappels',
  templateUrl: 'gerer-rappels.html',
})
export class GererRappelsPage {

  traitement;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.traitement = this.navParams.get('traitement');
    console.log(this.traitement);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GererRappelsPage');
  }

  deleteRappel() {

  }

  addRappel() {

  }

}
