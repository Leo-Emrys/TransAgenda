import { Component, ViewChild, NgZone } from '@angular/core';
import { NavController, NavParams, Slides } from 'ionic-angular';
import { listTypes, listHormones, listZones } from '../../listes/listes';

@Component({
  selector: 'page-new-traitement',
  templateUrl: 'new-traitement.html',
})
export class NewTraitementPage {

  traitement = {};
  listHormones;
  listTypes;
  listZones;
  @ViewChild(Slides) slides: Slides;
  submit=false;

  zones = [];
  new_zone;
  new_cote;
  new_zone_add;

  constructor(public navCtrl: NavController, public navParams: NavParams, private ngZone: NgZone) {
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
    switch(part) {
      case 1 :
      // !! commenté pour test; à décommenter!
        //if(this.traitement['produit'] && this.traitement['dosage'] && this.traitement['hormone'] && this.traitement['frequence']) {
          this.submit=false;
          this.slideNext();
        //}
      break;
    }
  }

  addZone() {
    this.submit=true;
    if(this.new_zone) {
      let nom = this.new_zone;
      if(this.new_zone=="add") {
        nom = this.new_zone_add;
        this.listZones.push(this.new_zone_add);
        this.listZones.sort();
      }
      if(nom && nom!='') {
        this.ngZone.run(() => {
          this.zones.push({nom: nom, cote: this.new_cote});
        });
        this.submit = false;
        if(this.new_zone=='add')
          this.new_zone=null;
        this.new_zone_add='';
      }
      
    }
  }


}
