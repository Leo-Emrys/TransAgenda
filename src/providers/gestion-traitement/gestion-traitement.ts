import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { FonctionsCommunesProvider } from "../../providers/fonctions-communes/fonctions-communes";


/*
  Toutes les manipulations sur l'objet traitement se font ici.
*/
@Injectable()
export class GestionTraitementProvider {

  constructor(private storage: Storage, private fonctionCommunes: FonctionsCommunesProvider, ) {
  }

  updateOneTraitementInStorage(modifiedTraitement) {
    return new Promise((resolve, reject) => {
      console.log('update', modifiedTraitement);
      // Recupere la liste de traitements existante, modifie UN des traitement, enregistre liste modifiée dans storage
      this.storage.get('TransAgenda_traitements').then((liste) => {
        if (liste) {
          let originTraitementIndex = liste.findIndex(traitement => traitement.id === modifiedTraitement.id);
          console.log('index ancien', originTraitementIndex);
          if (originTraitementIndex !== -1)
            liste[originTraitementIndex] = modifiedTraitement;
          else //non trouvé dans la liste, pas normal
            console.log('erreur impossible de retrouver traitement ' + modifiedTraitement.id);

          // Si la liste est nulle, on la créé... utile ? de tte façon y'a un souci.  
        } else {
          liste = [modifiedTraitement];
        }

        // Remplace liste dans storage
        this.storage.set('TransAgenda_traitements', liste).then(() => {
          resolve(true);
        }).catch((err) => {
          console.log('erreur gestion-traitement updateOneTraitementInStorage set liste traitements local', err);
          reject(err);
        });
      }).catch((err) => {
        console.log('erreur gestion-traitement updateOneTraitementInStorage get liste traitements local', err);
        reject(err);
      });
    })
  }


  updateNextZone(traitement) {
    if (!traitement.zones || traitement.zones.length < 1) {
      return;
    }

    if (traitement.zones.length >= 2) {
      let futureNextZoneIndex;
      let ancienneNextZoneIndex = traitement.zones.findIndex(zone => zone === traitement.next_zone);
      // Si on est pas a la fin de la liste des zones existantes, on prend la prochaine
      if (ancienneNextZoneIndex + 1 < traitement.zones.length) {
        futureNextZoneIndex = ancienneNextZoneIndex + 1;
      }
      else  // Sinon, on recommence du début
      {
        futureNextZoneIndex = 0;
      }

      traitement.next_zone = traitement.zones[futureNextZoneIndex];
      this.updateOneTraitementInStorage(traitement);
    }
  }

  supprimerTraitement(traitement) {
    return new Promise((resolve, reject) => {
      this.storage.get('TransAgenda_traitements').then((liste) => {
        if (liste) {
          let traitementIndex = liste.findIndex(tt => tt.id === traitement.id);
          if (traitementIndex !== -1) {
            liste.splice(traitementIndex, 1);
            this.storage.set('TransAgenda_traitements', liste).then((res) => {
              resolve(true);
            })
          } else {
            reject(false);
          }
        } else {
          reject(false);
        }
      });
    })
  }


  updateDates(traitement) {
    traitement.last_date = this.fonctionCommunes.toDateFormat(traitement.last_date);
    traitement.next_date = this.fonctionCommunes.toPrintDateFormat(this.getCalculatedNextDate(traitement.last_date, traitement.frequence));
    
    traitement.last_date = this.fonctionCommunes.toPrintDateFormat(traitement.last_date);
    this.updateOneTraitementInStorage(traitement);
  }

  initNextDate(traitement) {
    traitement.next_date = this.fonctionCommunes.toPrintDateFormat(traitement['start_date']);
  }

  private getCalculatedNextDate(lastDate : Date, frequence : any) {
    //var nextDate = new Date(last.setTime(new Date().getTime() + traitement.frequence * 86400000));// version calcul a partir d'aujourd'hui
    var nextDate = new Date(lastDate.getTime() + frequence * 86400000);  //version calcul a partir derniere date de prise
    return nextDate;
  }
}
