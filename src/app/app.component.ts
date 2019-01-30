import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: string = 'HomePage';

  pages: Array<{title: string,icon: string,iconcolor : string ,component: string}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Dashboard', icon:'home',iconcolor:'home-color', component: 'HomePage' },
      { title: 'Transaction', icon:'paper',iconcolor:'category-color', component: 'TransactionPage' },
      { title: 'Category', icon:'keypad',iconcolor:'category-color', component: 'CategoryPage' },
      { title: 'Cards', icon:'card',iconcolor:'card-color', component: 'CardsPage' },
      // { title: 'Income',icon:'trending-down',iconcolor:'income-color', component: 'IncomeListPage' },
      // { title: 'Expense', icon:'trending-up',iconcolor:'expense-color',component: 'ExpenseListPage' }
      
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
     
     
            if (this.platform.is('android')) {
              this.statusBar.styleDefault();
              this.statusBar.overlaysWebView(false);
              this.statusBar.backgroundColorByHexString('#0D47A1');
              this.splashScreen.hide();
            }
            
   
      
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
