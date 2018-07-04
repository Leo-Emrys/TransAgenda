import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NewTraitementPage } from '../new-traitement/new-traitement';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  newTraitement() {
    this.navCtrl.push(NewTraitementPage);
  }

}
