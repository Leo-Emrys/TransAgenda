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

  toPrintDateFormat(date)
  {
    let dateArray = date.split('-');
    if (dateArray && dateArray.length == 3){
      let year  = dateArray[0];
      let month = dateArray[1];
      let day = dateArray[2];

      return day + "/" + month + "/" + year;
    }
    return date;
  }

    toDateFormat(dateStr)
    {
      let dateArray = dateStr.split('/');
      if (dateArray && dateArray.length == 3){
        let day  = dateArray[0];
        let month = dateArray[1];
        let year = dateArray[2];

        return new Date(year + "-" + month + "-" + day);
      }
      return new Date(dateStr);
    }


}
