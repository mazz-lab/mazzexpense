import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AddIncomePage } from '../add-income/add-income';

@IonicPage()
@Component({
  selector: 'page-income-list',
  templateUrl: 'income-list.html',
})
export class IncomeListPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  addincome(){
    this.navCtrl.push(AddIncomePage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IncomeListPage');
  }

}
