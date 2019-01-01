import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ExpenseListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-expense-list',
  templateUrl: 'expense-list.html',
})
export class ExpenseListPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  addexpense(){
    this.navCtrl.push('AddExpensePage');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ExpenseListPage');
  }

}
