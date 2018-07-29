import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { FonctionsCommunesProvider } from "../../providers/fonctions-communes/fonctions-communes";
import { DetailTraitementPage } from '../detail-traitement/detail-traitement';
import { NewTraitementPage } from '../new-traitement/new-traitement';

@Component({
  selector: 'page-liste-traitements',
  templateUrl: 'liste-traitements.html',
})
export class ListeTraitementsPage {

  traitements;

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage, private fonctionCommunes : FonctionsCommunesProvider) {
    console.log(this.traitements);
      //aller chercher en local
      this.storage.get('TransAgenda_traitements').then((liste) => {
        if (liste && liste.length > 0) {
          this.traitements = liste;
          //console.log(this.traitements);
          //TEST
          //this.notifService.createNotifications(this.traitements[0]);
        }
      }).catch((err) => {
        console.log('erreur get liste traitements local', err);
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListeTraitementsPage');
  }

  prochaineDate(traitement) {
    // dans le tur-fu : ajouter prochaineDate en attribut de traitement et re calcul du champ que lors de la fonction de 
    // mise à jour du traitement, appelée par le bouton 'j'ai pris mon traitement'
    let last = new Date(traitement.date_debut);
    var next = new Date(last.setTime( last.getTime() + traitement.frequence * 86400000 ));
    let datestr =  (next.getDate() < 10 ? '0' + next.getDate() : next.getDate()) + '/' +  (next.getMonth() + 1 < 10 ? '0' + (next.getMonth() + 1) : next.getMonth() + 1) + '/' + next.getFullYear();
    return datestr;
  }

  openDetails(traitement) {
    console.log(traitement);
    this.navCtrl.push(DetailTraitementPage, {traitement: traitement});
  }

  new() {
    this.navCtrl.setRoot(NewTraitementPage)
  }
}
