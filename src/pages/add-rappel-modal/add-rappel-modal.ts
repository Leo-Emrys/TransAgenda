import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-add-rappel-modal',
  templateUrl: 'add-rappel-modal.html',
})
export class AddRappelModalPage {

  traitement;
  rappel = {};

  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController) {
    this.traitement = this.navParams.get('traitement');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddRappelModalPage');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  creer() {
    this.viewCtrl.dismiss({rappel : this.rappel});
  }

}
