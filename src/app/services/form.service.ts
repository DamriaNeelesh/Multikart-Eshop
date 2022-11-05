import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor() { }

  // Returns an observable array
  getCreditCardMonths(startMonth:number):Observable<number[]>{
     let data: number[]=[];
     // build an array for "Months" dropdown list
     // start at desired startMonth and loop untill 12

     for(let theMonth = startMonth; theMonth<=12; theMonth++){
       data.push(theMonth);
     }
     return of(data);
    //  The "of" operator from rxjs, will wrap an Object as an Observable
  }

  getCreditCardYears():Observable<number[]>{
    let data: number[]=[];
    // build an array for "Year" dropdown list
    // start at current year and loop for next 10
    const startYear: number =new Date().getFullYear(); // Getting the Current Year
    const endYear: number = startYear + 10;

    for(let theYear=startYear; theYear<= endYear; theYear++){
      data.push(theYear);
    }
    return of(data);
  }
}
