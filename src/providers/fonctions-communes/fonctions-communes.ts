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
    console.log('toprintdateformat', date);
    if (date && date instanceof Date){
      let year  = date.getFullYear();//.toString().substr(-2);
      let month = date.getMonth()+1;
      let day = date.getDate();

      return (day < 10 ? '0' + day : day) + "/" + (month < 10 ? '0' + month : month) + "/" + year;
    } else if(date) {
      let tab = date.split('-');
      return tab[2]+'/'+tab[1]+'/'+tab[0];
    }
    return date;
  }

    toDateFormat(dateStr)
    {
      console.log('datestr', dateStr)
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
