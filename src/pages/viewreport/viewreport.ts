import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController ,AlertController} from 'ionic-angular';

import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { DatePipe,CurrencyPipe } from '@angular/common';
import { UtilProvider } from '../../providers/util/util';
import { DatePicker } from '@ionic-native/date-picker';


@IonicPage()
@Component({
  selector: 'page-viewreport',
  templateUrl: 'viewreport.html',
})
export class ViewreportPage {

  expenses: any = [];
  totalIncome = 0;
  totalExpense = 0;
  balance = 0;
  selectedFromdate:any;
  selectedToDate:any;
  selectedDbFromdate:any;
  selectedDbToDate:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl : ViewController,
    private sqlite: SQLite,public datepipe: DatePipe,private currencyPipe: CurrencyPipe
    , public util: UtilProvider,public  alertCtrl: AlertController,private datePicker: DatePicker,) {
  }

  getCurrency(amount: number) {
    return this.currencyPipe.transform(this.util.getNumber(amount), 'INR', true, '1.2-2');
  }
  fromDate : any ;
  toDate : any 

  fromDDate : any;
  toDDate : any;

  ionViewWillEnter() {
    this.fromDate  =this.datepipe.transform(new Date(), 'dd/MM/yyyy');
  this.toDate  =this.datepipe.transform(new Date(), 'dd/MM/yyyy');

  this.fromDDate =this.datepipe.transform(this.fromDate, 'yyyy-MM-dd');
  this.toDDate =this.datepipe.transform(this.toDate, 'yyyy-MM-dd');
    // this.titlename=this.navParams.get('pagename');
     this.getTransactionData();
   }

  ionViewDidLoad() {
    // this.selectedFromdate=this.navParams.get('fromDate');
    // this.selectedToDate=this.navParams.get('toDate');

    // this.selectedDbFromdate=this.datepipe.transform(this.selectedFromdate, 'yyyy-MM-dd');
    // this.selectedDbToDate=this.datepipe.transform(this.selectedToDate, 'yyyy-MM-dd');

    // console.log("selectedDbFromdate.."+this.selectedDbFromdate);
    // console.log("selectedDbToDate.."+this.selectedDbToDate);
    this.getTransactionData();
  }
  
 
  

    
  openFromDatepicker(){
  //  this.keyboard.close();
    this.datePicker.show({
      date: new Date(this.fromDate),
      mode: 'date',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_DEVICE_DEFAULT_LIGHT
    }).then(
      date => {
  this.fromDate=this.datepipe.transform(date, 'dd/MM/yyyy');
  this.fromDDate=this.datepipe.transform(date, 'yyyy-MM-dd');
  this.getTransactionData();
  
  console.log("this.fromDate.."+this.fromDate);
       },
      err => console.log('Error occurred while getting date: ', err)
    );
  }

  openToDatepicker(){
    //  this.keyboard.close();
      this.datePicker.show({
        date: new Date(this.toDDate),
        mode: 'date',
        androidTheme: this.datePicker.ANDROID_THEMES.THEME_DEVICE_DEFAULT_LIGHT
      }).then(
        date => {
            this.toDate=this.datepipe.transform(date, 'dd/MM/yyyy');
            this.toDDate=this.datepipe.transform(date, 'yyyy-MM-dd');
            this.getTransactionData();
            console.log("this.toDate.."+this.toDate);
         },
        err => console.log('Error occurred while getting date: ', err)
      );
    }

  


  public closeReport(){
    this.viewCtrl.dismiss();
}

getTransactionData() {
  this.sqlite.create({
    name: 'mebdb.db',
    location: 'default'
  }).then((db: SQLiteObject) => {
    db.executeSql('CREATE TABLE IF NOT EXISTS expense(rowid INTEGER PRIMARY KEY, date TEXT, type TEXT,description TEXT, amount INT)', [])
      .then(res => console.log('Executed SQL'))
      .catch(e => console.log(e));
    db.executeSql('SELECT * FROM expense WHERE  date >= "'+this.fromDDate+'" and date <= "'+this.toDDate+'" ORDER BY rowid DESC ', [])
      .then(res => {
        this.expenses = [];
        for (var i = 0; i < res.rows.length; i++) {
          this.expenses.push({ rowid: res.rows.item(i).rowid, date: res.rows.item(i).date, type: res.rows.item(i).type, description: res.rows.item(i).description, amount: res.rows.item(i).amount })
        }
      })
      .catch(e => console.log(e));
    db.executeSql('SELECT SUM(amount) AS totalIncome FROM expense WHERE type="Income" and date >= "'+this.fromDDate+'" and date <= "'+this.toDDate+'"', [])
      .then(res => {
        if (res.rows.length > 0) {
          this.totalIncome = parseInt(res.rows.item(0).totalIncome);
          this.balance = this.totalIncome - this.totalExpense;
        }
      })
      .catch(e => console.log(e));
    db.executeSql('SELECT SUM(amount) AS totalExpense FROM expense WHERE type="Expense" and date >= "'+this.fromDDate+'" and date <= "'+this.toDDate+'"', [])
      .then(res => {
        if (res.rows.length > 0) {
          this.totalExpense = parseInt(res.rows.item(0).totalExpense);
          this.balance = this.totalIncome - this.totalExpense;
        }
      })
  }).catch(e => console.log(e));
}

}
