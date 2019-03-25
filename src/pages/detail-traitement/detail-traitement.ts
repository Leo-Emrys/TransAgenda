import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { GererRappelsPage } from '../gerer-rappels/gerer-rappels';
import { GererZonesPage } from '../gerer-zones/gerer-zones';
import { GestionTraitementProvider } from '../../providers/gestion-traitement/gestion-traitement';
import { ListeTraitementsPage } from '../liste-traitements/liste-traitements';

@Component({
  selector: 'page-detail-traitement',
  templateUrl: 'detail-traitement.html',
})
export class DetailTraitementPage {

  traitement;

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController, private traitementService: GestionTraitementProvider) {
    this.traitement = this.navParams.get('traitement');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailTraitementPage');
  }

  gererZones() {
    this.navCtrl.push(GererZonesPage, { traitement: this.traitement });
  }

  gererRappels() {
    this.navCtrl.push(GererRappelsPage, { traitement: this.traitement });
  }

  supprimerTraitement() {
    this.alertCtrl.create({
      message: "Voulez-vous vraiment supprimer ce traitement? Attention: cette action est irréversible.",
      buttons: [
        {
          text: 'NON',
          handler: () => {
          }
        },
        {
          text: "OUI",
          handler: () => {
            this.traitementService.supprimerTraitement(this.traitement).then((res) => {
              this.navCtrl.push(ListeTraitementsPage);
            })
          }
        }
      ]

    }).present();
  }

}
