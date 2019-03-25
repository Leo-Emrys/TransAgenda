import { Component, NgZone } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { FonctionsCommunesProvider } from "../../providers/fonctions-communes/fonctions-communes";
import { GestionTraitementProvider} from "../../providers/gestion-traitement/gestion-traitement"
import { DetailTraitementPage } from '../detail-traitement/detail-traitement';
import { NewTraitementPage } from '../new-traitement/new-traitement';
import { NotificationsProvider } from '../../providers/notifications/notifications';

@Component({
  selector: 'page-liste-traitements',
  templateUrl: 'liste-traitements.html',
})
export class ListeTraitementsPage {

  traitements;

  constructor(public navCtrl: NavController, public navParams: NavParams, private ngZone: NgZone, private storage: Storage,
               private fonctionCommunes : FonctionsCommunesProvider, private notificationsProvider: NotificationsProvider, private gestionTraitement : GestionTraitementProvider) {
    //console.log(this.traitements);
      //aller chercher en local
      this.storage.get('TransAgenda_traitements').then((liste) => {
        if (liste && liste.length > 0) {
          this.traitements = liste;
          console.log(this.traitements);
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

  openDetails(traitement) {
    console.log(traitement);
    this.navCtrl.push(DetailTraitementPage, {traitement: traitement});
  }

  updateTraitement(traitement) {

    this.ngZone.run(() => {
      // mise à jour de la zone pour la prochaine prise
      this.gestionTraitement.updateNextZone(traitement);

      // mise à jour de la date de la prochaine prise et de la derniere
      this.gestionTraitement.updateDates(traitement);

      // mise à jour des rappels programmés
      this.notificationsProvider.scheduleAllRappels(traitement);
   
   });
}
    

  new() {
    this.navCtrl.setRoot(NewTraitementPage)
  }

}
