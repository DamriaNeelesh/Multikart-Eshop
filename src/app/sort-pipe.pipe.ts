import { Pipe, PipeTransform } from '@angular/core';
import { UntypedFormArray } from '@angular/forms';

@Pipe({
  name: 'sortPipe'
})
export class SortPipePipe implements PipeTransform {
transform(value: any, ...args: any[]) {
  throw new Error('Method not implemented.');
}
// We are creating a logiv behind the sorting according to the price of the products 
ransform(value: Array<string>, args: any[]): any {
  const sortField = args[0];
  const sortDirection = args[1];
  let multiplier = 1;

  if (sortDirection === 'desc') {
    multiplier = -1;
  }

  value.sort((a: any, b: any) => {
    if (a[sortField] < b[sortField]) {
      return -1 * multiplier;
    } else if (a[sortField] > b[sortField]) {
      return 1 * multiplier;
    } else {
      return 0;
    }
  }
  );

  return value;
}


}
