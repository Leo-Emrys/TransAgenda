import { Injectable } from '@angular/core';

/*
  Generated class for the FonctionsCommunesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FonctionsCommunesProvider {

  constructor() {
    //console.log('Hello FonctionsCommunesProvider Provider');
  }

  printZone(zone)
  {
    return zone.nom + " " 
          + (zone.cote ? zone.cote : "") 
          + (zone.cote=="droit" ? "(e)" : "");
  }

}
