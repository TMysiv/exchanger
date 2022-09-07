import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

import {ICurrencies} from "./interfaces/currencies.interface";

@Injectable({
  providedIn: 'root'
})
export class ExchangerCurrencyService {

  private url = 'https://api.exchangerate.host/latest';


  constructor(private httpClient:HttpClient) { }

  getALLCurrencies():Observable<any>{
    return this.httpClient.get<ICurrencies>(this.url)
  }

  getCurrency(fromCurrency:string,toCurrency:string):Observable<any>{
    return this.httpClient.get<ICurrencies>(this.url + `?base=${fromCurrency}&symbols=${toCurrency}`)
  }

  getUsdAndEuro(currency:string):Observable<any>{
    return this.httpClient.get<any>(this.url + `?base=${currency}`)
  }
}
