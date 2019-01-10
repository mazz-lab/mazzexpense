import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, FabContainer } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { DatePipe,CurrencyPipe } from '@angular/common';
import { Chart } from 'chart.js';


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
  

  @ViewChild('barCanvas') barCanvas;
    @ViewChild('doughnutCanvas') doughnutCanvas;
    @ViewChild('lineCanvas') lineCanvas;

    barChart: any;
    doughnutChart: any;
    lineChart: any;
  
    ;

  

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

  // Doughnut
  public memberChartOptions: any = {
    responsive: true,
    legend: {
        display: false,
        labels: {
            display: false
        }
    }
};

expensest: any = [this.totalIncome,this.totalExpense,this.balance];



// events
public chartClicked(e:any):void {
  console.log(e);
  
}

public chartHovered(e:any):void {
  console.log(e);
}

public doughnutChartLabels:string[];
public doughnutChartData:number[]=[200,330,45.9];

public doughnutChartType:string = 'doughnut';
public chartColors: any[] = [{ backgroundColor:["#2E7D32", "#C62828", "#4A148C"] }];

chartData(){

   this.doughnutChartLabels = ['Icome', 'Expense', 'Balanse'];
 //this.doughnutChartData = [this.totalIncome,this.totalExpense,this.balance];
 this.doughnutChartData = [200,330,45.9];

}



  ionViewDidLoad() {
    this.getData();
    this.chartData();
    
    console.log("enter.."+this.totalExpense);
    // this.intialChatJs();
  }


  ionViewWillEnter() {
    this.getData();
    this.chartData();
    console.log("enter.."+this.totalExpense);
    // this.intialChatJs();
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

 


  // Chat Js

  intialChatJs(){

  //   this.barChart = new Chart(this.barCanvas.nativeElement, {

  //     type: 'bar',
  //     data: {
  //         labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
  //         datasets: [{
  //             label: '# of Votes',
  //             data: [12, 19, 3, 5, 2, 3],
  //             backgroundColor: [
  //                 'rgba(255, 99, 132, 0.2)',
  //                 'rgba(54, 162, 235, 0.2)',
  //                 'rgba(255, 206, 86, 0.2)',
  //                 'rgba(75, 192, 192, 0.2)',
  //                 'rgba(153, 102, 255, 0.2)',
  //                 'rgba(255, 159, 64, 0.2)'
  //             ],
  //             borderColor: [
  //                 'rgba(255,99,132,1)',
  //                 'rgba(54, 162, 235, 1)',
  //                 'rgba(255, 206, 86, 1)',
  //                 'rgba(75, 192, 192, 1)',
  //                 'rgba(153, 102, 255, 1)',
  //                 'rgba(255, 159, 64, 1)'
  //             ],
  //             borderWidth: 1
  //         }]
  //     },
  //     options: {
  //         scales: {
  //             yAxes: [{
  //                 ticks: {
  //                     beginAtZero:true
  //                 }
  //             }]
  //         }
  //     }

  // });


  this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {

    type: 'doughnut',
    data: {
        labels: ["Income", "Expense", "Balanse"],
        options: {
          legend: {
            display: false
        },
        tooltips: {
          filter: function (tooltipItem) {
            return tooltipItem.datasetIndex === 0;
        }
        },
      },
        datasets: [{
            label: '# of Votes',
            data: [20, 12, 8,],
            tooltip: false,
            backgroundColor: [
                '#2E7D32',
                '#C62828',
                '#4A148C',

                
            ],
            hoverBackgroundColor: [
              '#2E7D32',
              '#C62828',
              '#4A148C',
            ]
        }]
    }

});

// this.lineChart = new Chart(this.lineCanvas.nativeElement, {

//     type: 'line',
//     data: {
//         labels: ["January", "February", "March", "April", "May", "June", "July"],
//         datasets: [
//             {
//                 label: "My First dataset",
//                 fill: false,
//                 lineTension: 0.1,
//                 backgroundColor: "rgba(75,192,192,0.4)",
//                 borderColor: "rgba(75,192,192,1)",
//                 borderCapStyle: 'butt',
//                 borderDash: [],
//                 borderDashOffset: 0.0,
//                 borderJoinStyle: 'miter',
//                 pointBorderColor: "rgba(75,192,192,1)",
//                 pointBackgroundColor: "#fff",
//                 pointBorderWidth: 1,
//                 pointHoverRadius: 5,
//                 pointHoverBackgroundColor: "rgba(75,192,192,1)",
//                 pointHoverBorderColor: "rgba(220,220,220,1)",
//                 pointHoverBorderWidth: 2,
//                 pointRadius: 1,
//                 pointHitRadius: 10,
//                 data: [65, 59, 80, 81, 56, 55, 40],
//                 spanGaps: false,
//             }
//         ]
//     }

// });



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
            this.expensest.push(this.totalIncome);
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
