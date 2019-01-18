import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the UtilProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UtilProvider {

  constructor() {
    console.log('Hello UtilProvider Provider');
  }

  getcurrentMonthEndDate(){
    var date = new Date(), year = date.getFullYear(), month = date.getMonth();
   
    return new Date(year, month + 1, 0);
   
   }
   
   getcurrentMonthStartDate(){
     var date = new Date(), year = date.getFullYear(), month = date.getMonth();
    
     return new Date(year, month, 1);
    
    }

}
