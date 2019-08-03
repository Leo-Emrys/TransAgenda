import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class OrdonnanceProvider {

  constructor(private storage: Storage) {
    console.log('Hello OrdonnanceProvider Provider');
  }

  addNewOrdonnance(ordonnance) {
    return new Promise((resolve, reject) => {
      this.storage.get('TransAgenda_ordonnances').then((ordos) => {
        if (ordos) {
          ordos.push(ordonnance);
        } else {
          ordos = [ordonnance];
        }
        this.storage.set('TransAgenda_ordonnances', ordos).then(() => {
          resolve(true);
        })
      })
    });
  }

  getOrdonnances() {
    return new Promise((resolve, reject) => {
      this.storage.get('TransAgenda_ordonnances').then((result) => {
        resolve(result);
      }).catch((err) => {
        reject(err);
      })
    })
  }

  deleteOrdonnance(ordonnance) {
    return new Promise((resolve, reject) => {
      this.storage.get('TransAgenda_ordonnances').then((result) => {
        let index;
        result.find((ordo, i) => {
          index=i;
          return ordo == ordonnance;
        })
        result.splice(index, 1);
        this.storage.set('TransAgenda_ordonnances', result).then(() => {
          resolve(result);
        })
      }).catch((err) => {
        reject(err);
      })
    })
  }

}
