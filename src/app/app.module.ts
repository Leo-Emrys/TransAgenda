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

@NgModule({
  declarations: [
    HomePage,
    MenuFooterComponent,
    MyApp,
    NewTraitementPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    HomePage,
    MenuFooterComponent,
    MyApp,
    NewTraitementPage
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    StatusBar,
    SplashScreen,
    VariablesCommunesProvider
  ]
})
export class AppModule {}
