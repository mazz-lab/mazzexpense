import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Toast } from '@ionic-native/toast';

/**
 * Generated class for the AddcategoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-addcategory',
  templateUrl: 'addcategory.html',
})
export class AddcategoryPage {

  titlename:string;
  categorydata = { categorytype:"", categoryname:""};

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl : ViewController,
    private sqlite: SQLite,
    private toast: Toast,) {
  }


  public closeModal(){
    this.viewCtrl.dismiss();
}
  ionViewDidLoad() {
    console.log('ionViewDidLoad AddcategoryPage');
    console.log(this.navParams.get('message'));
    this.titlename=this.navParams.get('pagename');
  }

  saveData() {

   

    this.sqlite.create({
      name: 'mebdb.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('INSERT INTO expense VALUES(NULL,?,?,?,?)',[this.categorydata.categorytype,this.categorydata.categoryname])
        .then(res => {
          console.log(res);
          this.toast.show('Data saved', '5000', 'center').subscribe(
            toast => {
              this.navCtrl.popToRoot();
            }
          );
        })
        .catch(e => {
          console.log(e);
          this.toast.show(e, '5000', 'center').subscribe(
            toast => {
              console.log(toast);
            }
          );
        });
    }).catch(e => {
      console.log(e);
      this.toast.show(e, '5000', 'center').subscribe(
        toast => {
          console.log(toast);
        }
      );
    });
  }

}
