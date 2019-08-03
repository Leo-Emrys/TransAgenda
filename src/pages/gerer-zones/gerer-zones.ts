import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { GestionTraitementProvider } from '../../providers/gestion-traitement/gestion-traitement';
import { AddZoneModalPage } from '../add-zone-modal/add-zone-modal';

@Component({
  selector: 'page-gerer-zones',
  templateUrl: 'gerer-zones.html',
})
export class GererZonesPage {

  traitement;
  displayZones;

  constructor(public navCtrl: NavController, public navParams: NavParams, private traitementService: GestionTraitementProvider, private modalCtrl: ModalController) {
    this.traitement = this.navParams.get('traitement');
    if (this.traitement.zones) {
      this.displayZones = this.traitement.zones.slice();
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GererZonesPage');
  }

  delete(zone) {
    let index;
    let found = this.traitement.zones.find((z, i) => {
      index = i;
      return z == zone;
    });
    this.traitement.zones.splice(index, 1);
    if (this.traitement.next_zone == zone) {
      if (this.traitement.zones && this.traitement.zones.length > 0) {
        this.traitement.next_zone = this.traitement.zones[0];
      } else {
        this.traitement.next_zone = null;
      }
    }
    this.displayZones = this.traitement.zones.slice();
    this.traitementService.updateOneTraitementInStorage(this.traitement);
  }


  addZone() {
    let modal = this.modalCtrl.create(AddZoneModalPage, { traitement: this.traitement });
    modal.onDidDismiss((data) => {
      console.log(data, this.traitement.zones, this.displayZones);
      if (data) {
        if(!this.traitement.zones || this.traitement.zones.length<=0) {
          this.traitement.next_zone = data.zone;
        }
        if (this.traitement.zones)
          this.traitement.zones.push(data.zone);
        else {
          this.traitement.zones = [data.zone];
        }
        if (this.displayZones) {
          console.log('this.displayzones non vide')
          this.displayZones.push(data.zone);
        } else {
          console.log('this.displayzones vide')
          this.displayZones = [data.zone];
        }
        console.log(this.displayZones, this.traitement.zones)
        // modifier dans storage
        this.traitementService.updateOneTraitementInStorage(this.traitement);
      }
    });
    modal.present();
  }

}
