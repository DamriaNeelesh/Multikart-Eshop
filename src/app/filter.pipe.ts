import { Pipe, PipeTransform } from '@angular/core';
import { filter } from 'rxjs';
import { IProducts } from './products';

@Pipe({
  name:
   'filterProducts'
})

export class FilterPipe implements PipeTransform {
  transform(items: IProducts[], searchText: string, fieldName: string): any[] {

    // return empty array if array is falsy
    if (!items){
      return [];
    }

    // return the original array if search text is empty
    if (!searchText) { return items; }

    // convert the searchText to lower case
    searchText = searchText.toLowerCase();

    // retrun the filtered array
    return items.filter(item => {
      if (item && item[fieldName]) {
        return item[fieldName].toLowerCase().includes(searchText);
      }
      return false;
    });
   }
}

/*
<input type="text" [(ngModel)]="searchText" placeholder="Search Category" />

<!-- List of categories -->
<ul>
  <li *ngFor="let item of categories | filter : searchText : 'categoryName'">
	{{item.categoryName}}
  </li>
</li>
*/

