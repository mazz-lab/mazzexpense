import { Component } from '@angular/core';
import { IonicPage, NavController, FabContainer } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { DatePipe,CurrencyPipe } from '@angular/common';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  expenses: any = [];
  totalIncome = 0.00;
  totalExpense = 0.00;
  balance = 0.00;

  

  WeekRevenue = { totalIncome: 0.00, totalExpense: 0.00, totalBalance: 0.00 };
  TodayRevenue = { totalIncome: 0.00, totalExpense: 0.00, totalBalance: 0.00 };

  today = new Date().toISOString();
  month = this.today; //months from 1-12


   curr: any = new Date; // get current date
 first:any = this.curr.getDate() - this.curr.getDay(); // First day is the day of the month - the day of the week
 last : any = this.first + 6; // last day is the first day + 6

 firstday  = new Date(this.curr.setDate(this.first)).toUTCString();
 lastday = new Date(this.curr.setDate(this.last)).toUTCString();
  

  
  latest_date : any =this.datepipe.transform(this.today, 'dd/MM/yyyy E');
  week_start : any =this.datepipe.transform(this.firstday, 'dd/MM');
  week_end : any =this.datepipe.transform(this.lastday, 'dd/MM');

  week_start_day : any =this.datepipe.transform(this.firstday, 'yyyy-MM-dd');
  week_end_end : any =this.datepipe.transform(this.lastday, 'yyyy-MM-dd');
  today_full : any =this.datepipe.transform(this.today, 'yyyy-MM-dd');
  public event = {
    month: this.today,
    today:this.latest_date,
    this_week:this.week_start+' - '+this.week_end,

  }

  fabButtonOpened: Boolean;
  segmentblock:any;

  constructor(public navCtrl: NavController, private sqlite: SQLite,public datepipe: DatePipe,private currencyPipe: CurrencyPipe ) {
    this.fabButtonOpened = false;
    this.segmentblock = "dashboard";
   


  }
  getCurrency(amount: number) {
    return this.currencyPipe.transform(amount, 'INR', true, '1.2-2');
  }

 


  openFabButton() {
    if (this.fabButtonOpened == false) {
      this.fabButtonOpened = true;
    } else {
      this.fabButtonOpened = false;
    }
  }


  goExpense(fab: FabContainer) {
    fab.close();
    this.fabButtonOpened = false;
    this.fabButtonOpened = false;
    this.navCtrl.push('AddExpensePage');

  }

  goIncome(fab: FabContainer) {
    this.fabButtonOpened = false;
    fab.close();

    this.navCtrl.push('AddIncomePage');
  }

  ionViewDidLoad() {
    this.getData();
  }

  ionViewWillEnter() {
    this.getData();
  }

  getData() {
    this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('CREATE TABLE IF NOT EXISTS expense(rowid INTEGER PRIMARY KEY, date TEXT, type TEXT,description TEXT, amount REAL DEFAULT 0.00)', [])
        .then(res => console.log('Executed SQL'))
        .catch(e => console.log(e));
      db.executeSql('SELECT * FROM expense ORDER BY date DESC', [])
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
            this.totalIncome = parseFloat(res.rows.item(0).totalIncome);
            this.balance = this.totalIncome - this.totalExpense;
          }
        })
        .catch(e => console.log(e));
        
      db.executeSql('SELECT SUM(amount) AS totalExpense FROM expense WHERE type="Expense"', [])
        .then(res => {
          if (res.rows.length > 0) {
            this.totalExpense = parseFloat(res.rows.item(0).totalExpense);
            this.balance = this.totalIncome - this.totalExpense;
          }
        })

// Week report income
db.executeSql('SELECT SUM(amount) AS totalExpense FROM expense WHERE type="Income" and date >= "'+this.week_start_day+'" and date <= "'+this.week_end_end+'"', [])
.then(res => {
  if (res.rows.length > 0) {
    this.WeekRevenue.totalIncome = parseFloat(res.rows.item(0).totalExpense);
   // this.balance = this.totalIncome - this.totalExpense;
  }
})

// week revenue Expense
db.executeSql('SELECT SUM(amount) AS totalExpense FROM expense WHERE type="Expense" and date >= "'+this.week_start_day+'" and date <= "'+this.week_end_end+'"', [])
.then(res => {
  if (res.rows.length > 0) {
    this.WeekRevenue.totalExpense = parseFloat(res.rows.item(0).totalExpense);
    this.WeekRevenue.totalBalance = this.WeekRevenue.totalIncome - this.WeekRevenue.totalExpense;
  }
})



// today report income
db.executeSql('SELECT SUM(amount) AS totalExpense FROM expense WHERE type="Income" and date = "'+this.today_full+'"', [])
.then(res => {
  if (res.rows.length > 0) {
    this.TodayRevenue.totalIncome = parseFloat(res.rows.item(0).totalExpense);
   // this.balance = this.totalIncome - this.totalExpense;
  }
})

// today revenue Expense
db.executeSql('SELECT SUM(amount) AS totalExpense FROM expense WHERE type="Expense" and date= "'+this.today_full+'"', [])
.then(res => {
  if (res.rows.length > 0) {
    this.TodayRevenue.totalExpense = parseFloat(res.rows.item(0).totalExpense);
    this.TodayRevenue.totalBalance = this.TodayRevenue.totalIncome - this.TodayRevenue.totalExpense;
  }
})

    }).catch(e => console.log(e));
  }

  // addData() {
  //  this.navCtrl.push(AddDataPage);
  // }

  // editData(rowid) {
  //this.navCtrl.push(EditDataPage, {
  //    rowid:rowid
  //  });
  // }

  // deleteData(rowid) {
  //   this.sqlite.create({
  //     name: 'ionicdb.db',
  //     location: 'default'
  //   }).then((db: SQLiteObject) => {
  //     db.executeSql('DELETE FROM expense WHERE rowid=?', [rowid])
  //     .then(res => {
  //       console.log(res);
  //       this.getData();
  //     })
  //     .catch(e => console.log(e));
  //   }).catch(e => console.log(e));
  // }

}
