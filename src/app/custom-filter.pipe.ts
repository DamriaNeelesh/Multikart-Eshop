import { Pipe, PipeTransform } from '@angular/core';
import { IProducts } from './products';

@Pipe({
  name: 'customFilter'
})
export class CustomFilterPipe implements PipeTransform {

  transform(people: IProducts[], term: any): any {
    //check if search term is undefined
    if(term === undefined) return people;
    //return updates people array
    return people.filter(function(thisperson){
        return thisperson.product_category.toLowerCase().includes(term.toLowerCase()) ||  
               thisperson.product_category_type.toLowerCase().includes(term.toLowerCase()) ||
               thisperson.product_name.toLowerCase().includes(term.toLowerCase()) ;
     }) 

  }

}
