import { Component, ViewChild } from '@angular/core';
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
  newzone;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
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

}
