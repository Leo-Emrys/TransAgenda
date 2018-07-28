import { Component, ViewChild, NgZone } from '@angular/core';
import { NavController, NavParams, Slides } from 'ionic-angular';
import { listTypes, listHormones, listZones } from '../../listes/listes';
import { Storage } from '@ionic/storage';
import { ListeTraitementsPage } from '../liste-traitements/liste-traitements';
import { NotificationsProvider } from '../../providers/notifications/notifications';


@Component({
  selector: 'page-new-traitement',
  templateUrl: 'new-traitement.html',
})
export class NewTraitementPage {

  traitement = { zones: [], rappels: [] };
  listHormones;
  listTypes;
  listZones;
  @ViewChild(Slides) slides: Slides;
  submit = false;

  //zones = [];
  new_zone;
  new_cote;
  new_zone_add;
  newRappel = {};

  today;

  constructor(public navCtrl: NavController, public navParams: NavParams, private ngZone: NgZone, private storage: Storage, private notifications: NotificationsProvider) {
    let date = new Date();
    this.today = date.getFullYear() + '-' + (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-' + (date.getDate() < 10 ? '0' + date.getDate() : date.getDate());
    console.log(this.today);

  }

  ngOnInit() {
    //récupérer les listes pour les selects
    this.listHormones = listHormones.sort();
    this.listTypes = listTypes.sort();
    this.listZones = listZones.sort();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewTraitementPage');
    //bloque le slide sans passer par la validation du formulaire
    this.slides.lockSwipes(true);
  }

  slideNext() {
    this.slides.lockSwipes(false);
    this.slides.slideNext();
    this.slides.lockSwipes(true);
  }

  slidePrev() {
    this.slides.lockSwipes(false);
    this.slides.slidePrev();
    this.slides.lockSwipes(true);
  }

  submitForm(part) {
    this.submit = true;
    switch (part) {
      case 1:
        if(this.traitement['produit'] && this.traitement['dosage'] && this.traitement['hormone'] && this.traitement['frequence']) {
          this.submit = false;
          this.slideNext();
        }
        break;
      case 2:
        this.submit = false;
        this.slideNext();
        break;
      case 3:
        console.log(this.traitement['date_debut']);
        if (this.traitement['date_debut']) {
          this.submit = false;
          this.slideNext();
        }
        break;
      case 4:
        this.storage.get('TransAgenda_traitements').then((liste)=> {
          if(liste) {
            liste.push(this.traitement);
          } else {
            liste = [this.traitement];
          }
          this.storage.set('TransAgenda_traitements', liste).then(() => {
            //creer les notifications
            this.notifications.createNotifications(this.traitement);
            //aller page liste traitements
            this.navCtrl.setRoot(ListeTraitementsPage, {traitements: liste});
          }).catch((err) => {
            console.log('erreur set liste traitements local', err);
          });
        }).catch((err) => {
          console.log('erreur get liste traitements local', err);
        });
        break;
    }
  }

  addZone() {
    this.submit = true;
    if (this.new_zone) {
      let nom = this.new_zone;
      if (this.new_zone == "add") {
        nom = this.new_zone_add;
        this.listZones.push(this.new_zone_add);
        this.listZones.sort();
      }
      if (nom && nom != '') {
        this.ngZone.run(() => {
          this.traitement.zones.push({ nom: nom, cote: this.new_cote });
        });
        this.submit = false;
        if (this.new_zone == 'add')
          this.new_zone = null;
        this.new_zone_add = '';
      }
    }
  }

  addRappel() {
    this.submit = true;
    if (this.newRappel && this.newRappel['nb_jours'] && this.newRappel['heure']) {
      this.ngZone.run(() => {
        this.traitement.rappels.push({ nb_jours: this.newRappel['nb_jours'], heure: this.newRappel['heure'] });
      });
      this.submit = false;
      this.newRappel = {nb_jours: '', heure: ''};
    }
    console.log(this.traitement.rappels);
  }

  deleteZone(zone) {
    this.traitement.zones.splice(this.traitement.zones.indexOf(zone), 1);
  }

  deleteRappel(rappel) {
    this.traitement.rappels.splice(this.traitement.rappels.indexOf(rappel), 1);
  }
}
