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
  selectediconname:string="hamburger";
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
  buttonColor: string = '#FFFFF';
  imagepath="assets/imgs/";

  addEvent(selectedicon: any){
    this.selectediconname=selectedicon;
    // this.imagepath+""+selectedicon+".png";
    
    this.buttonColor = '#345465'; //desired Color
    
    /*
    YOUR FUNCTION CODE
    */
    
    }
// used for an example of ngFor and navigation
categoryicon = [
  { iconname: 'hamburger', color:'home'},
  { iconname: 'milk-bottle', color:'home'},
   { iconname: 'local_cafe', color:'home'},
  { iconname: 'local_car_wash', color:'home'},
  { iconname: 'local_gas_station', color:'home'},
  { iconname: 'local_grocery_store', color:'home'},
  { iconname: 'local_hospital', color:'home'},
  { iconname: 'local_hotel', color:'home'},
  { iconname: 'local_mall', color:'home'},
  { iconname: 'local_movies', color:'home'},
  { iconname: 'local_pharmacy', color:'home'},
  { iconname: 'local_taxi', color:'home'},
  { iconname: 'phone_iphone', color:'home'},
  { iconname: 'train', color:'home'},
  { iconname: 'child_care', color:'home'},
  { iconname: 'child_friendly', color:'home'},
  { iconname: 'computer', color:'home'},
  { iconname: 'access-pointge', color:'home'},
  
  { iconname: 'tv', color:'home'}
  
  
  
];



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
