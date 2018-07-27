import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-liste-traitements',
  templateUrl: 'liste-traitements.html',
})
export class ListeTraitementsPage {

  traitements;

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage) {
    this.traitements = this.navParams.get("traitements");
    console.log(this.traitements);
    if (!this.traitements) {
      //aller chercher en local
      this.storage.get('TransAgenda_traitements').then((liste) => {
        if (liste && liste.length > 0) {
          this.traitements = liste;
          //console.log(this.traitements);
        }
      }).catch((err) => {
        console.log('erreur get liste traitements local', err);
      });
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListeTraitementsPage');
  }

  prochaineDate(traitement) {
    let last = new Date(traitement.date_debut);
    var next = new Date(last.setTime( last.getTime() + traitement.frequence * 86400000 ));
    let datestr =  (next.getDate() < 10 ? '0' + next.getDate() : next.getDate()) + '/' +  (next.getMonth() + 1 < 10 ? '0' + (next.getMonth() + 1) : next.getMonth() + 1) + '/' + next.getFullYear();
    return datestr;
  }

}
