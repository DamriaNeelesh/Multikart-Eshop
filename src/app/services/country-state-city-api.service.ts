import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Country } from '../models/country.model';


@Injectable({
  providedIn: 'root'
})

export class CountryStateCityApiService {

  Country : any[] | undefined;


  constructor(private http:HttpClient) { }
  // We fetch Country data from the API using this service file

  httpOptions = {
    headers: new HttpHeaders({
      'Contnet-type':'application/json',
      'X-CSCAPI-KEY': 'MGZMRlZLbkZ0SmNiOGkxQzBlREFLYjBKdlZZU1BnRmlRbGI3N2lvVg==',
      "Accept": "application/json",
       "api-token": "D_LkIlW5ZZTWWgjMzdvSCNRfy5X39ozDAM4jMJqrN126KK_Bpm8ZCBE7N34nhiWCPaY",
       "user-email": "damrianeelesh@gmail.com",
    })
  }

  // fetching an API of Country
  // get krke aur kis link se data get krna hai ek country[] array mai dalne ke liye and hamne Country[] ka model bhi bana rakha hai
  getCountry():Observable<Country[]>{
    return this.http.get<Country[]>('https://api.countrystatecity.in/v1/countries',
    {headers:this.httpOptions.headers})
  }
// Now ab hamne ek baari mai he observable se Country ki array leli now hame bss uss country ke iso ko agle function mai pass krna hai
// uske get url mai ki ham ab wo data ka url get kr rhe jiska countryIso respected country ke andr aata hai
// jo country selected hori usi ka countryIso data aa jaega
  getStateOnSelectedCountry(countryIso:string):Observable<any>{
    return this.http.get(`https://api.countrystatecity.in/v1/countries/${countryIso}/states`,
    {headers:this.httpOptions.headers});
  }

/// Same procedure for the Cities
  getCitiesOnSelectedState(countryIso:any,stateIso:any):Observable<any>{
    return this.http.get(`https://api.countrystatecity.in/v1/countries/${countryIso}/states/${stateIso}/cities`,
    {headers:this.httpOptions.headers})
  }
}
