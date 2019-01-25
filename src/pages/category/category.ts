import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

/**
 * Generated class for the CategoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-category',
  templateUrl: 'category.html',
})
export class CategoryPage {

  expenses_category: any = [];
  income_category: any = [];

  segmentblock:any;

  

  constructor(public navCtrl: NavController, public navParams: NavParams,public modalCtrl : ModalController,
    private sqlite: SQLite,) {
    this.segmentblock = "Expenses";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CategoryPage');
  }



  getData() {
    this.sqlite.create({
      name: 'mebdb.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('CREATE TABLE IF NOT EXISTS expense(categoryid INTEGER PRIMARY KEY, categorytype TEXT, type TEXT,categoryname TEXT)', [])
        .then(res => console.log('Executed SQL'))
        .catch(e => console.log(e));
      db.executeSql('SELECT * FROM expense where categorytype="Expense"  ORDER BY rowid DESC', [])
        .then(res => {
          this.expenses_category = [];
          for (var i = 0; i < res.rows.length; i++) {
            this.expenses_category.push({ categoryid: res.rows.item(i).categoryid, categorytype: res.rows.item(i).categorytype, categoryname: res.rows.item(i).categoryname})
          }
        })
        .catch(e => console.log(e));

        db.executeSql('SELECT * FROM expense where categorytype="Income"  ORDER BY rowid DESC', [])
        .then(res => {
          this.income_category = [];
          for (var i = 0; i < res.rows.length; i++) {
            this.income_category.push({ categoryid: res.rows.item(i).categoryid, categorytype: res.rows.item(i).categorytype, categoryname: res.rows.item(i).categoryname})
          }
        })
        .catch(e => console.log(e));


    }).catch(e => console.log(e));
  }

  public openModal(){
    var data = { pagename : '',datavalue:'' };
    if(this.segmentblock==="Expenses"){
      data.pagename="Expenses";
    }else{
      data.pagename="Income";

    }

    

    
    var modalPage = this.modalCtrl.create('AddcategoryPage',data);
    modalPage.present();
}

}
