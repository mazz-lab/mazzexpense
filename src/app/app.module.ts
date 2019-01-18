import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { DatePipe,CurrencyPipe } from '@angular/common';

import { SQLite } from '@ionic-native/sqlite';
import { Toast } from '@ionic-native/toast';
import { MyApp } from './app.component';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ChartsModule } from 'ng2-charts';
import { UtilProvider } from '../providers/util/util';

@NgModule({
  declarations: [
    MyApp,
   
    
    
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp,{statusbarPadding: true}),
    ChartsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
   
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SQLite,
    Toast,
    DatePipe,
    CurrencyPipe,
    UtilProvider,
  ]
})
export class AppModule {}
