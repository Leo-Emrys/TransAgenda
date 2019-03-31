import { Injectable } from '@angular/core';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { GestionTraitementProvider } from '../gestion-traitement/gestion-traitement';

let cordova;

@Injectable()
export class NotificationsProvider {

  constructor(private localNotifications: LocalNotifications, private traitementService: GestionTraitementProvider) {
    console.log('Hello NotificationsProvider Provider');
  }

  createNotifications(traitement) {
    let liste = traitement.rappels;
    liste.forEach((rappel, index) => {
    if (!rappel.sup) {
      /* let prochdate = new Date(new Date(traitement.start_date).getTime() - (1000 * 60 * 60 * 24 * rappel.nb_jours));
      let year = prochdate.getFullYear();
      let month = prochdate.getMonth();
      let day = prochdate.getDate();
      let datestr = ""+year+'-'+((month<10) ? '0'+(month+1) : (month+1))+'-'+((day<10) ? '0'+day: day)+'T'+rappel.heure;
      console.log(datestr);
      let dateRappel = new Date(datestr); */
      let dateRappel = this.getDateRappel(traitement, rappel);
      let idrappel = traitement.id + '' + index;


        let texte = traitement.produit + " à prendre dans " + rappel.nb_jours + " jours !";
        if (rappel.nb_jours == 1) {
          texte = traitement.produit + " à prendre demain !";
        } else if (rappel.nb_jours == 0) {
          texte = traitement.produit + " à prendre aujourd'hui !"
        }

        console.log(dateRappel);
        console.log(idrappel);
        this.localNotifications.schedule({
          id: +idrappel,
          text: texte + idrappel,
          trigger: { at: dateRappel },
          vibrate: true,
          led: 'FF0000',
          //sound: null
        });
      }
    });
    this.localNotifications.getScheduledIds().then((result) => {
      console.log('scheduled rappels', result);
    });
  }

  deleteNotification(traitement, rappel) {
    return new Promise((resolve, reject) => {
      let index;
      let found = traitement.rappels.find((r, i) => {
        index = i;
        return r == rappel && !r.sup;
      });
      if (!found) {
        reject('not found');
      }
      let id = traitement.id + "" + index;
     /*  this.localNotifications.getScheduledIds().then((result) => {
        console.log('scheduled rappels', result);
      });
      
      this.localNotifications.getScheduled(+id).then((res) => {
        console.log('delete', res);
      }); */
      //cancel notification
      this.localNotifications.cancel(id).then((res) => {
        console.log("cancelled", res);
        rappel.sup = true;
        traitement.rappels[index].sup = true;
        //todo: modifier dans storage
        this.traitementService.updateOneTraitementInStorage(traitement).then((res) => {
          resolve(true);
        })
      })
    });
  }

  addNotification(traitement, rappel) {
    return new Promise((resolve, reject) => {
      let dateRappel = this.getDateRappel(traitement, rappel);
      let index = traitement.rappels.length;
      //let found = traitement.rappels.find((r, i) => {index=i; return r==rappel;});
      let idrappel = traitement.id + '' + index;
  
      let texte = traitement.produit + " à prendre dans " + rappel.nb_jours + " jours !";
      if (rappel.nb_jours == 1) {
        texte = traitement.produit + " à prendre demain !";
      } else if (rappel.nb_jours == 0) {
        texte = traitement.produit + " à prendre aujourd'hui !"
      }
  
      console.log(dateRappel);
      console.log(idrappel);
      this.localNotifications.schedule({
        id: +idrappel,
        text: texte + idrappel,
        trigger: { at: dateRappel },
        vibrate: true,
        led: 'FF0000',
        //sound: null
      });
      resolve(true);
    });
  }

  scheduleAllRappels(traitement) {
    for(let rappel of traitement.rappels) {
      console.log(rappel);
      if(!rappel.sup)
        this.addNotification(traitement, rappel);
    }
  }

  getDateRappel(traitement, rappel) {
    let prochdate = new Date(new Date(traitement.next_date).getTime() - (1000 * 60 * 60 * 24 * rappel.nb_jours));
    let year = prochdate.getFullYear();
    let month = prochdate.getMonth();
    let day = prochdate.getDate();
    let datestr = "" + year + '-' + ((month < 10) ? '0' + (month + 1) : (month + 1)) + '-' + ((day < 10) ? '0' + day : day) + 'T' + rappel.heure;
    console.log(datestr);
    let dateRappel = new Date(datestr);
    //let idrappel = traitement.id+''+index;
    return dateRappel;
  }

}
