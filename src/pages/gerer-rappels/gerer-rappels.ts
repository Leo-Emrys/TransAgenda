import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, ModalController } from 'ionic-angular';
import { NotificationsProvider } from '../../providers/notifications/notifications';
import { AddRappelModalPage } from '../add-rappel-modal/add-rappel-modal';
import { GestionTraitementProvider } from '../../providers/gestion-traitement/gestion-traitement';

@Component({
  selector: 'page-gerer-rappels',
  templateUrl: 'gerer-rappels.html',
})
export class GererRappelsPage {

  traitement;
  displayRappels;

  constructor(public navCtrl: NavController, public navParams: NavParams, private notifications: NotificationsProvider, private toastCtrl: ToastController, private modalCtrl: ModalController, private traitementService: GestionTraitementProvider) {
    this.traitement = this.navParams.get('traitement');
    if(this.traitement.rappels) {
      this.displayRappels = this.traitement.rappels.filter((r) => !r.sup)
    }
    console.log(this.traitement);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GererRappelsPage');
  }

  delete(rappel) {
    this.notifications.deleteNotification(this.traitement, rappel).then((result) => {
      console.log(result);
      if(this.traitement.rappels) {
        this.displayRappels = this.traitement.rappels.filter((r) => !r.sup)
      } else {
        this.displayRappels = [];
      }
    }).catch((err) => {
      console.log(err);
    })
  }

  addRappel() {
    let modal = this.modalCtrl.create(AddRappelModalPage, {traitement:this.traitement});
    modal.onDidDismiss((data) => {
      if(data) {
        this.notifications.addNotification(this.traitement, data.rappel, true).then((res) => {
          if(this.traitement.rappels)
            this.traitement.rappels.push(data.rappel);
          else
            this.traitement.rappels = [data.rappel];
          if(this.displayRappels) {
            this.displayRappels.push(data.rappel);
          } else {
            this.displayRappels = [data.rappel];
          }
          // modifier dans storage
          this.traitementService.updateOneTraitementInStorage(this.traitement);
        }).catch((err) => {
          console.log(err);
          this.toastCtrl.create({
            message: "Erreur lors de la creation du rappel",
            position: "bottom"
          }).present();
        })
        
      }
    })
    modal.present();
  }

}
