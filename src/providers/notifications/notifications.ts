import { Injectable } from '@angular/core';
import { LocalNotifications } from '@ionic-native/local-notifications';

@Injectable()
export class NotificationsProvider {

  constructor(private localNotifications: LocalNotifications) {
    console.log('Hello NotificationsProvider Provider');
  }

  createNotifications(traitement) {
    let liste = traitement.rappels;
    liste.forEach((rappel, index) => {
      let prochdate = new Date(new Date(traitement.start_date).getTime() - (1000 * 60 * 60 * 24 * rappel.nb_jours));
      let year = prochdate.getFullYear();
      let month = prochdate.getMonth();
      let day = prochdate.getDate();
      let datestr = ""+year+'-'+((month<10) ? '0'+month : month)+'-'+((day<10) ? '0'+day: day)+'T'+rappel.heure;
      console.log(datestr);
      let dateRappel = new Date(datestr);

      console.log(dateRappel);

      this.localNotifications.schedule({
        id: index,
        text: 'Notification '+index,
        trigger: {at: dateRappel},
        vibrate: true,
        led: 'FF0000',
        sound: null
     });
    });
  }

  deleteNotification(traitement, rappel) {

  }

  addNotification(traitement, rappel) {
    
  }

}
