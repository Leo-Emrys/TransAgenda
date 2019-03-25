import { Injectable } from '@angular/core';
import { Storage} from '@ionic/storage';
import { FonctionsCommunesProvider } from "../../providers/fonctions-communes/fonctions-communes";


/*
  Toutes les manipulations sur l'objet traitement se font ici.
*/
@Injectable()
export class GestionTraitementProvider {

  constructor(private storage: Storage, private fonctionCommunes : FonctionsCommunesProvider,) {  
  }
  
  updateOneTraitementInStorage(modifiedTraitement){
    return new Promise((resolve, reject) => {
      console.log('update', modifiedTraitement);
      // Recupere la liste de traitements existante, modifie UN des traitement, enregistre liste modifiée dans storage
      this.storage.get('TransAgenda_traitements').then((liste)=> {
        if(liste) {
          let originTraitementIndex = liste.findIndex(traitement => traitement.id === modifiedTraitement.id);
          console.log('index ancien', originTraitementIndex);
          if(originTraitementIndex!==-1)
            liste[originTraitementIndex] = modifiedTraitement;
          else //non trouvé dans la liste, pas normal
            console.log('erreur impossible de retrouver traitement '+modifiedTraitement.id);
        
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


  updateNextZone(traitement){
        if(!traitement.zones || traitement.zones.length < 1)
        {
          return;
        }

        if(traitement.zones.length >= 2)
        {
            let futureNextZoneIndex;
            let ancienneNextZoneIndex = traitement.zones.findIndex(zone => zone === traitement.next_zone);
            // Si on est pas a la fin de la liste des zones existantes, on prend la prochaine
            if (ancienneNextZoneIndex +1 < traitement.zones.length)
            {
                futureNextZoneIndex = ancienneNextZoneIndex +1;
            }
            else  // Sinon, on recommence du début
            {
              futureNextZoneIndex = 0;
            }

            traitement.next_zone = traitement.zones[futureNextZoneIndex];
            this.updateOneTraitementInStorage(traitement);
        }
    }

    
    updateDates(traitement){
      traitement.last_date = this.fonctionCommunes.toPrintDateFormat(new Date());
      traitement.next_date = this.fonctionCommunes.toPrintDateFormat(this.getCalculatedNextDate(traitement));
      this.updateOneTraitementInStorage(traitement);
    }

    initNextDate(traitement){
      traitement.next_date = this.fonctionCommunes.toPrintDateFormat(traitement['start_date']);
    }

    private getCalculatedNextDate(traitement) {
      let last = this.fonctionCommunes.toDateFormat(traitement.next_date);
      var nextDate = new Date(last.setTime(new Date().getTime() + traitement.frequence * 86400000));// version calcul a partir d'aujourd'hui
      //last.getTime() + traitement.frequence * 86400000 ));  //version calcul a partir derniere date de prise
      return nextDate;
    }  
}
