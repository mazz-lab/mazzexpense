import { Component } from '@angular/core';
import { IonicPage, NavController, FabContainer } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { DatePipe,CurrencyPipe } from '@angular/common';
import { UtilProvider } from '../../providers/util/util';


@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  expenses: any = [];
  totalIncome =  0.00;
  totalExpense = 0.00;
  balance = 0.00;

    cahngeddate: any;
  
    getchanged($event){

      this.cahngeddate=$event.month+"-"+$event.year;
      console.log("selected Date"+$event);
    }

   

  WeekRevenue = { totalIncome: 0.00, totalExpense: 0.00, totalBalance: 0.00 };
  TodayRevenue = { totalIncome: 0.00, totalExpense: 0.00, totalBalance: 0.00 };
  MonthRevenue = { Income: 0.00, totalExpense: 0.00, totalBalance: 0.00 };

  today = new Date().toISOString();
data_final:any;



  month = this.today; //months from 1-12


  
  latest_date : any =this.datepipe.transform(this.today, 'dd/MM/yyyy E');
  week_start : any =this.datepipe.transform(this.util.getCurrentWeekStartDate(), 'dd/MM');
  week_end : any =this.datepipe.transform(this.util.getCurrentWeekEndDate(), 'dd/MM');

  week_start_day : any =this.datepipe.transform(this.util.getCurrentWeekStartDate(), 'yyyy-MM-dd');
  week_end_end : any =this.datepipe.transform(this.util.getCurrentWeekEndDate(), 'yyyy-MM-dd');

  month_start_day : any =this.datepipe.transform(this.util.getcurrentMonthStartDate(), 'yyyy-MM-dd');
  month_end_end : any =this.datepipe.transform(this.util.getcurrentMonthEndDate(), 'yyyy-MM-dd');

  today_full : any =this.datepipe.transform(this.today, 'yyyy-MM-dd');
  public event = {
    month: this.today,
    today:this.latest_date,
    this_week:this.week_start+' - '+this.week_end,

  }

  fabButtonOpened: Boolean;
  segmentblock:any;

  constructor(public navCtrl: NavController, private sqlite: SQLite,public datepipe: DatePipe,private currencyPipe: CurrencyPipe
    , public util: UtilProvider ) {
    this.fabButtonOpened = false;
    this.segmentblock = "dashboard";
    this.data_final=this.util.getcurrentMonthStartDate();
    
  }


  ionViewDidLoad() {
    this.getData();
  }


  ionViewWillEnter() {
    this.getData();
  }


  getCurrency(amount: number) {
    return this.currencyPipe.transform(this.util.getNumber(amount), 'INR', true, '1.2-2');
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

 



  getData() {
    this.sqlite.create({
      name: 'mebdb.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('CREATE TABLE IF NOT EXISTS expense(rowid INTEGER PRIMARY KEY, date TEXT, type TEXT,description TEXT, amount REAL DEFAULT 0.00)', [])
        .then(res => console.log('Executed SQL'))
        .catch(e => console.log(e));
      db.executeSql('SELECT * FROM expense where date = "'+this.today_full+'" ORDER BY date DESC', [])
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





// Month report income
db.executeSql('SELECT SUM(amount) AS totalExpense FROM expense WHERE type="Income" and date >= "'+this.month_start_day+'" and date <= "'+this.month_end_end+'"', [])
.then(res => {
  if (res.rows.length > 0) {
    this.MonthRevenue.Income = parseFloat(res.rows.item(0).totalExpense);
   // this.balance = this.totalIncome - this.totalExpense;
  }
})

// Month revenue Expense
db.executeSql('SELECT SUM(amount) AS totalExpense FROM expense WHERE type="Expense" and date >= "'+this.month_start_day+'" and date <= "'+this.month_end_end+'"', [])
.then(res => {
  if (res.rows.length > 0) {
    this.MonthRevenue.totalExpense = parseFloat(res.rows.item(0).totalExpense);
    this.MonthRevenue.totalBalance = this.MonthRevenue.Income - this.MonthRevenue.totalExpense;
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

  deleteData(rowid) {
    this.sqlite.create({
      name: 'mebdb.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('DELETE FROM expense WHERE rowid=?', [rowid])
      .then(res => {
        console.log(res);
        this.getData();
      })
      .catch(e => console.log(e));
    }).catch(e => console.log(e));
  }

}
