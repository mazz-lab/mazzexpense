import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public event = {
    month: '1990-02-19',
    timeEnds: '1990-02-20'
  }

  constructor(public navCtrl: NavController) {

  }

}
