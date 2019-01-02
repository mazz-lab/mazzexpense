import { Component } from '@angular/core';
import { IonicPage,NavController,FabContainer } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  
  totalRevenue = { totalIncome:0, totalExpense:0, totalBalance:0};

  today = new Date().toISOString();
 month  = this.today; //months from 1-12
  public event = {
    month: this.today,
    
  }

  fabButtonOpened: Boolean;

  constructor(public navCtrl: NavController) {
    this.fabButtonOpened=false;

    
    
  }


  openFabButton(){
    if(this.fabButtonOpened==false){
      this.fabButtonOpened=true;
  }else{
      this.fabButtonOpened=false;
  }
  }


  goExpense(fab: FabContainer){
    fab.close();
    this.fabButtonOpened=false;
    this.fabButtonOpened=false;
    this.navCtrl.push('AddExpensePage');

  }

  goIncome(fab: FabContainer){
    this.fabButtonOpened=false;
    fab.close();
    
    this.navCtrl.push('AddIncomePage');
  }

  ionViewDidLoad() {
    
    console.log('ionViewDidLoad IncomeListPage');
  }

}
