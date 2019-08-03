import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { listZones } from '../../listes/listes';

@Component({
  selector: 'page-add-zone-modal',
  templateUrl: 'add-zone-modal.html',
})
export class AddZoneModalPage {

  listZones;
  zone = {};

  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController) {
    this.listZones = listZones;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddZoneModalPage');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  creer() {
    this.viewCtrl.dismiss({zone : this.zone});
  }
}
