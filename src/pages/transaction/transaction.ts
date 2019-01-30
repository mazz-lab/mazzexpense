import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController,FabContainer } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { DatePipe,CurrencyPipe } from '@angular/common';
import { UtilProvider } from '../../providers/util/util';

/**
 * Generated class for the TransactionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-transaction',
  templateUrl: 'transaction.html',
})
export class TransactionPage {

  expenses: any = [];
  totalIncome = 0;
  totalExpense = 0;
  balance = 0;
  fabButtonOpened: Boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams,private sqlite: SQLite,public datepipe: DatePipe,private currencyPipe: CurrencyPipe
    , public util: UtilProvider,public  alertCtrl: AlertController) {
     this.fabButtonOpened = false;
  }

  


  ionViewDidLoad() {
    this.getTransactionData();
  }

  ionViewWillEnter() {
    this.getTransactionData();
  }


  getCurrency(amount: number) {
    return this.currencyPipe.transform(this.util.getNumber(amount), 'INR', true, '1.2-2');
  }


  deleteTransactionData(rowid) {

     let alert = this.alertCtrl.create({
      title: 'Confirmation',
      subTitle: 'Do you want delete?',
      buttons: [{
        text: 'No',
          handler: () => {
            alert.dismiss().then(() => {  this.getTransactionData(); });
            return false;
          }},
        
          {
            text: 'Yes',
              handler: () => {
                alert.dismiss().then(() => {this.deleteTranData(rowid); 
                this.getTransactionData(); });
                return false;
              }}
      ]
  });
  alert.present();

    
  
  }

  deleteTranData(rowid){

    this.sqlite.create({
      name: 'mebdb.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('DELETE FROM expense WHERE rowid=?', [rowid])
      .then(res => {
        console.log(res);
        this.getTransactionData();
      })
      .catch(e => console.log(e));
    }).catch(e => console.log(e));
  }

  getTransactionData() {
    this.sqlite.create({
      name: 'mebdb.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('CREATE TABLE IF NOT EXISTS expense(rowid INTEGER PRIMARY KEY, date TEXT, type TEXT,description TEXT, amount INT)', [])
        .then(res => console.log('Executed SQL'))
        .catch(e => console.log(e));
      db.executeSql('SELECT * FROM expense  ORDER BY rowid DESC', [])
        .then(res => {
          this.expenses = [];
          for (var i = 0; i < res.rows.length; i++) {
            this.expenses.push({ rowid: res.rows.item(i).rowid, date: res.rows.item(i).date, type: res.rows.item(i).type, description: res.rows.item(i).description, amount: res.rows.item(i).amount })
          }
        })
        .catch(e => console.log(e));
      db.executeSql('SELECT SUM(amount) AS totalIncome FROM expense WHERE type="Income"', [])
        .then(res => {
          if (res.rows.length > 0) {
            this.totalIncome = parseInt(res.rows.item(0).totalIncome);
            this.balance = this.totalIncome - this.totalExpense;
          }
        })
        .catch(e => console.log(e));
      db.executeSql('SELECT SUM(amount) AS totalExpense FROM expense WHERE type="Expense"', [])
        .then(res => {
          if (res.rows.length > 0) {
            this.totalExpense = parseInt(res.rows.item(0).totalExpense);
            this.balance = this.totalIncome - this.totalExpense;
          }
        })
    }).catch(e => console.log(e));
  }




  openTranFabButton() {
    if (this.fabButtonOpened == false) {
      this.fabButtonOpened = true;
    } else {
      this.fabButtonOpened = false;
    }
  }

  goTranExpense(fab: FabContainer) {
    fab.close();
    this.fabButtonOpened = false;
    this.fabButtonOpened = false;
    this.navCtrl.push('AddExpensePage');

  }

  goTranIncome(fab: FabContainer) {
    this.fabButtonOpened = false;
    fab.close();

    this.navCtrl.push('AddIncomePage');
  }

}
