import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CurrencyPipe } from '@angular/common';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Toast } from '@ionic-native/toast';

@IonicPage()
@Component({
  selector: 'page-add-income',
  templateUrl: 'add-income.html',
})
export class AddIncomePage {

  data = { date:"", type:"Income", description:"", amount:""};
  myModelVariable = '';

  constructor(public navCtrl: NavController, public navParams: NavParams,private sqlite: SQLite,
    private toast: Toast,private currencyPipe: CurrencyPipe) {
  }

  setCurrencyFormat(amount: number) {
    return this.currencyPipe.transform(amount, 'INR', true, '1.2-2');
  }

  convert(event: any) {
    console.log('old:', this.myModelVariable);
    this.myModelVariable = event.target.value.replace(/[^\d\.]/g ,'');
    console.log('new:', this.myModelVariable);
  }
  saveData() {

   

    this.sqlite.create({
      name: 'mebdb.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('INSERT INTO expense VALUES(NULL,?,?,?,?)',[this.data.date,this.data.type,this.data.description,this.data.amount])
        .then(res => {
          console.log(res);
          this.toast.show('Data saved', '5000', 'center').subscribe(
            toast => {
              this.navCtrl.popToRoot();
            }
          );
        })
        .catch(e => {
          console.log(e);
          this.toast.show(e, '5000', 'center').subscribe(
            toast => {
              console.log(toast);
            }
          );
        });
    }).catch(e => {
      console.log(e);
      this.toast.show(e, '5000', 'center').subscribe(
        toast => {
          console.log(toast);
        }
      );
    });

}
}
