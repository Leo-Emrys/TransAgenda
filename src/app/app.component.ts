import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';

import { HomePage } from '../pages/home/home';
import { ListeTraitementsPage } from '../pages/liste-traitements/liste-traitements';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = HomePage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private storage: Storage) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      this.storage.get('TransAgenda_traitements').then((liste) => {
        if (liste && liste.length > 0) {
          this.rootPage = ListeTraitementsPage;
        }
      }).catch((err) => {
        console.log('erreur get liste traitements local', err);
      });
    });
  }
}

