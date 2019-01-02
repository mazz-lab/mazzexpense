import { Component } from '@angular/core';
import { IonicPage,NavController,FabContainer } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public event = {
    month: '1990-02-19',
    timeEnds: '1990-02-20'
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
    this.navCtrl.push('AddExpensePage');

  }

  goIncome(fab: FabContainer){
    fab.close();
    this.fabButtonOpened=false;
    this.navCtrl.push('AddIncomePage');
  }

}
