import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController,AlertController } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Toast } from '@ionic-native/toast';

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
    private sqlite: SQLite,private toast: Toast,public  alertCtrl: AlertController) {
    this.segmentblock = "Expenses";
  //   this.expenses_category=[
  //     {
  //     categoryname:"dsadas",iconname:"logo"
  //   },

  //   {
  //     categoryname:"sds",iconname:"logo"
  //   },
  // ];
  }

  ionViewDidLoad() {
    this.getData();
  }


  ionViewWillEnter() {
    this.getData();
  }


  deleteCategory(rowid){

    let alert = this.alertCtrl.create({
      title: 'Confirmation',
      subTitle: 'Do you want delete?',
      buttons: [{
        text: 'No',
          handler: () => {
            alert.dismiss().then(() => {  this.getData(); });
            return false;
          }},
        
          {
            text: 'Yes',
              handler: () => {
                alert.dismiss().then(() => {this.deleteData(rowid); 
                this.getData(); });
                return false;
              }}
      ]
  });
  alert.present();

 

  }

  deleteData(rowid) {
    this.sqlite.create({
      name: 'mebdb.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('DELETE FROM category WHERE categoryid=?', [rowid])
      .then(res => {
        console.log(res);
        this.getData();
      })
      .catch(e => console.log(e));
    }).catch(e => console.log(e));
  }

  getData() {
    this.sqlite.create({
      name: 'mebdb.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('CREATE TABLE IF NOT EXISTS category(categoryid INTEGER PRIMARY KEY, categorytype TEXT,categoryname TEXT,categoryiconname TEXT,categoryiconcolor TEXT)', [])
        .then(res => console.log('Executed SQL'))
        .catch(e => console.log(e));
      db.executeSql('SELECT * FROM category where categorytype="Expenses"  ORDER BY categoryid DESC', [])
        .then(res => {
         
          this.expenses_category = [];
          for (var i = 0; i < res.rows.length; i++) {
            // this.toast.show("data.."+res.rows.item(i).categorytype, '5000', 'center').subscribe(
            //   toast => {
            //     console.log(toast);
            //   }
            // );
            this.expenses_category.push({ categoryid: res.rows.item(i).categoryid, categorytype: res.rows.item(i).categorytype, categoryname: res.rows.item(i).categoryname, categoryiconname: res.rows.item(i).categoryiconname, categoryiconcolor: res.rows.item(i).categoryiconcolor})
          }
        })
        .catch(e => 
        
          this.toast.show("error.."+e, '5000', 'center').subscribe(
            toast => {
              console.log(toast);
            }
          )
          
          );

        db.executeSql('SELECT * FROM category where categorytype="Income"  ORDER BY categoryid DESC', [])
        .then(res => {
          this.income_category = [];
          for (var i = 0; i < res.rows.length; i++) {
            this.income_category.push({ categoryid: res.rows.item(i).categoryid, categorytype: res.rows.item(i).categorytype, categoryname: res.rows.item(i).categoryname, categoryiconname: res.rows.item(i).categoryiconname, categoryiconcolor: res.rows.item(i).categoryiconcolor})
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
    modalPage.onDidDismiss(() => {
      this.getData();
    });
    modalPage.present();
}

}