import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController,ModalController } from 'ionic-angular';

import { DatePipe,CurrencyPipe } from '@angular/common';
import { UtilProvider } from '../../providers/util/util';
import { DatePicker } from '@ionic-native/date-picker';
//import { Keyboard } from '@ionic-native/keyboard';


@IonicPage()
@Component({
  selector: 'page-report',
  templateUrl: 'report.html',
})
export class ReportPage {
  expenses: any = [];
  totalIncome = 0;
  totalExpense = 0;
  balance = 0;
  data = { date:"", type:"Income", description:"", amount:""};

  constructor(public navCtrl: NavController, public navParams: NavParams,public datepipe: DatePipe,private currencyPipe: CurrencyPipe
    , public util: UtilProvider,public  alertCtrl: AlertController,private datePicker: DatePicker,public modalCtrl : ModalController,
    ) {


  }
  // public keyboard : Keyboard

  openDatePicker(){
  this.datePicker.show({
    date: new Date(),
    mode: 'date',
    androidTheme: this.datePicker.ANDROID_THEMES.THEME_TRADITIONAL
  },
  
  ).then(
    date => console.log('Got date: ', date),
    err => console.log('Error occurred while getting date: ', err)
  );


  }
  fromDate : any;
  toDate : any;

  fromDDate : any;
  toDDate : any;
  openFromDatepicker(){
  //  this.keyboard.close();
    this.datePicker.show({
      date: new Date(),
      mode: 'date',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_DEVICE_DEFAULT_LIGHT
    }).then(
      date => {
  this.fromDate=this.datepipe.transform(date, 'dd/MM/yyyy');
  this.fromDDate=this.datepipe.transform(date, 'yyyy-MM-dd');
  
  console.log("this.fromDate.."+this.fromDate);
       },
      err => console.log('Error occurred while getting date: ', err)
    );
  }

  openToDatepicker(){
    //  this.keyboard.close();
      this.datePicker.show({
        date: new Date(),
        mode: 'date',
        androidTheme: this.datePicker.ANDROID_THEMES.THEME_DEVICE_DEFAULT_LIGHT
      }).then(
        date => {
            this.toDate=this.datepipe.transform(date, 'dd/MM/yyyy');
            this.toDDate=this.datepipe.transform(date, 'yyyy-MM-dd');
            console.log("this.toDate.."+this.toDate);
         },
        err => console.log('Error occurred while getting date: ', err)
      );
    }

  public openReport(){
    console.log("call report");
     var data = { fromDate : this.fromDDate,toDate:this.toDDate };
    
    var reportViewmodal = this.modalCtrl.create('ViewreportPage',data);
    reportViewmodal.onDidDismiss(() => {
      // this.getData();
    });
    reportViewmodal.present();
}



  showDatePicker(){
    this.datePicker.show({
      date: new Date(),
      mode: 'date',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK
    }).then(
      date => console.log('Got date: ', date),
      err => console.log('Error occurred while getting date: ', err)
    );
  }

  getCurrency(amount: number) {
    return this.currencyPipe.transform(this.util.getNumber(amount), 'INR', true, '1.2-2');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReportPage');
  }

}
