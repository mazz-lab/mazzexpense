import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { ExpenseListPage } from '../pages/expense-list/expense-list';
import { AddExpensePage } from '../pages/add-expense/add-expense';
import { IncomeListPage } from '../pages/income-list/income-list';
import { AddIncomePage } from '../pages/add-income/add-income';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    ExpenseListPage,
    AddExpensePage,
    IncomeListPage,
    AddIncomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    ExpenseListPage,
    AddExpensePage,
    IncomeListPage,
    AddIncomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
