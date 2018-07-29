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
  
  private updateOneTraitementInStorage(modifiedTraitement){
    // Recupere la liste de traitements existante, modifie UN des traitement, enregistre liste modifiée dans storage
    this.storage.get('TransAgenda_traitements').then((liste)=> {
      if(liste) {
      let originTraitementIndex = liste.findIndex(traitement => traitement.nom === modifiedTraitement.nom);
      liste[originTraitementIndex] = modifiedTraitement;
      
      // Si la liste est nulle, on la créé... utile ? de tte façon y'a un souci.  
      } else {
          liste = [modifiedTraitement];
      }

      // Remplace liste dans storage
      this.storage.set('TransAgenda_traitements', liste).then(() => {
        
      }).catch((err) => {
        console.log('erreur gestion-traitement updateOneTraitementInStorage set liste traitements local', err);
      });
    }).catch((err) => {
      console.log('erreur gestion-traitement updateOneTraitementInStorage get liste traitements local', err);
    });  
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

    
    updateNextDate(traitement){
      traitement.next_date = this.fonctionCommunes.toPrintDateFormat(this.getCalculatedNextDate(traitement));
      this.updateOneTraitementInStorage(traitement);
    }

    initNextDate(traitement){
      traitement.next_date = this.fonctionCommunes.toPrintDateFormat(traitement['start_date']);
    }

    private getCalculatedNextDate(traitement) {
      let last = this.fonctionCommunes.toDateFormat(traitement.next_date);
      var next = new Date(last.setTime( last.getTime() + traitement.frequence * 86400000 ));
      let datestr =  (next.getDate() < 10 ? '0' + next.getDate() : next.getDate()) + '/' +  (next.getMonth() + 1 < 10 ? '0' + (next.getMonth() + 1) : next.getMonth() + 1) + '/' + next.getFullYear();
      return datestr;
    }  
}
