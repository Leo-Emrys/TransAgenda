import { Component, NgZone, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { FonctionsCommunesProvider } from "../../providers/fonctions-communes/fonctions-communes";
import { GestionTraitementProvider } from "../../providers/gestion-traitement/gestion-traitement"
import { DetailTraitementPage } from '../detail-traitement/detail-traitement';
import { NewTraitementPage } from '../new-traitement/new-traitement';
import { NotificationsProvider } from '../../providers/notifications/notifications';

@Component({
  selector: 'page-liste-traitements',
  templateUrl: 'liste-traitements.html',
})
export class ListeTraitementsPage {

  traitements;
  date_derniere_prise: string;
  current_traitement: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private ngZone: NgZone, private storage: Storage,
    private fonctionCommunes: FonctionsCommunesProvider, private notificationsProvider: NotificationsProvider, private gestionTraitement: GestionTraitementProvider) {
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
    this.navCtrl.push(DetailTraitementPage, { traitement: traitement });
  }

  @ViewChild('datePicker') datePicker;
  showDatePicker(traitement) {
    this.current_traitement = traitement;
    this.datePicker.open();
  }

  updateTraitement() {
    // récupération de la dernière valeur date_derniere_prise
    this.current_traitement.last_date = this.date_derniere_prise;

    this.ngZone.run(() => {
      // mise à jour de la zone pour la prochaine prise
      this.gestionTraitement.updateNextZone(this.current_traitement);

      // mise à jour de la date de la prochaine prise et de la derniere
      this.gestionTraitement.updateDates(this.current_traitement);
      console.log("last_date = " + this.current_traitement.last_date + "  next_date = " + this.current_traitement.next_date);

      // mise à jour des rappels programmés
      this.notificationsProvider.scheduleAllRappels(this.current_traitement);
    });

  }


  new() {
    this.navCtrl.setRoot(NewTraitementPage)
  }

}
