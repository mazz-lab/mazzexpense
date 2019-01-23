import { Pipe, PipeTransform } from '@angular/core';
import {DecimalPipe} from '@angular/common';

/**
 * Generated class for the NanPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'nanPipe',
})
export class NanPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform (value: any, args: string) {
    let pipe = new DecimalPipe('en');
    value = isNaN(value) ? 0 : +value;
    return pipe.transform(value, args);
  }
}
