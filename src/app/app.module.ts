import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { MenuFooterComponent } from '../components/menu-footer/menu-footer';
import { VariablesCommunesProvider } from '../providers/variables-communes/variables-communes';
import { NewTraitementPage } from '../pages/new-traitement/new-traitement';
import { ListeTraitementsPage } from '../pages/liste-traitements/liste-traitements';

import { IonicStorageModule } from '@ionic/storage';
import { FonctionsCommunesProvider } from '../providers/fonctions-communes/fonctions-communes';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { NotificationsProvider } from '../providers/notifications/notifications';
import { DetailTraitementPage } from '../pages/detail-traitement/detail-traitement';
import { GererRappelsPage } from '../pages/gerer-rappels/gerer-rappels';
import { GererZonesPage } from '../pages/gerer-zones/gerer-zones';


@NgModule({
  declarations: [
    DetailTraitementPage,
    GererRappelsPage,
    GererZonesPage,
    HomePage,
    ListeTraitementsPage,
    MenuFooterComponent,
    MyApp,
    NewTraitementPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      monthNames: ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre' ],
      monthShortNames: ['jan', 'fev', 'mar', 'avr', 'mai', 'juin', 'juil', 'août', 'sept', 'oct', 'nov', 'déc'],
      dayNames: ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche' ],
      dayShortNames: ['lun', 'mar', 'mer', 'jeu', 'ven', 'sam', 'dim' ],
    }),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    DetailTraitementPage,
    GererRappelsPage,
    GererZonesPage,
    HomePage,
    ListeTraitementsPage,
    MenuFooterComponent,
    MyApp,
    NewTraitementPage,
  ],
  providers: [
    LocalNotifications,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SplashScreen,
    StatusBar,
    VariablesCommunesProvider,
    FonctionsCommunesProvider,
    NotificationsProvider
  ]
})
export class AppModule {}
