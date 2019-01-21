
import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';

@Injectable()
export class UtilProvider {

  constructor(public datepipe: DatePipe) {
    console.log('Hello UtilProvider Provider');
  }

  getcurrentMonthEndDate() {
    var date = new Date(), year = date.getFullYear(), month = date.getMonth();
  return new Date(year, month + 1, 0);

  }

  getcurrentMonthStartDate() {
    var date = new Date(), year = date.getFullYear(), month = date.getMonth();
      return new Date(year, month, 1);
  }

  
  getCurrentWeekStartDate() {
    var curr = new Date(); // get current date
    var first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
    //console.log("first day"+first);
    console.log("first day"+new Date(curr.setDate(first)).toUTCString());
    return new Date(curr.setDate(first)).toUTCString();
  }

  convertDateFormate(day, formate) {
    this.datepipe.transform(day, formate);
  }

  getCurrentWeekEndDate() {
    var curr = new Date(); // get current date
    var first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
    var last = first + 6; // last day is the first day + 6
    return new Date(curr.setDate(last)).toUTCString();
  }


}
