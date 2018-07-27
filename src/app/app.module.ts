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

import { IonicStorageModule } from '@ionic/storage';
import { ListeTraitementsPage } from '../pages/liste-traitements/liste-traitements';

@NgModule({
  declarations: [
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
    HomePage,
    ListeTraitementsPage,
    MenuFooterComponent,
    MyApp,
    NewTraitementPage
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SplashScreen,
    StatusBar,
    VariablesCommunesProvider
  ]
})
export class AppModule {}
