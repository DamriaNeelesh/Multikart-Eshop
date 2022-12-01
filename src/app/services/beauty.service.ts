import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class BeautyService {

  constructor(private http:HttpClient) { }

  getBeautyProducts(){
    return this.http.get('beautyProducts.json');
  }
}
