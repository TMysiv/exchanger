import {Component, OnInit} from '@angular/core';
import {ExchangerCurrencyService} from "./exchanger-currency.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  usd:string = '';
  eur:string = '';

  currencies:string[] = [];
  fromCurrency:string = '';
  toCurrency:string = '';

  exchangeRate:number = 0;

  amount:number = 1;
  amountFromCurrency:boolean = true;

  fromAmount:number;
  toAmount:number;

  constructor(private exchangerService: ExchangerCurrencyService) {
  }

  ngOnInit(): void {
    this.exchangerService.getALLCurrencies().subscribe(value => {

      const firstCurrency = Object.keys(value.rates)[0];

      this.currencies = [value.base, ...Object.keys(value.rates)]

      this.fromCurrency = value.base;
      this.toCurrency = firstCurrency

      this.exchangeRate = value.rates[firstCurrency]
    });

    this.exchangerService.getUsdAndEuro('USD').subscribe(value => {
      this.usd = value.rates.UAH.toFixed(2)
    })
    this.exchangerService.getUsdAndEuro('EUR').subscribe(value => {
      this.eur = value.rates.UAH.toFixed(2)
    })
  }

  exchangerCurrency(){
    if (this.amountFromCurrency){
      this.fromAmount = this.amount;
      this.toAmount = this.amount * this.exchangeRate
    }else {
      this.toAmount = this.amount;
      this.fromAmount = this.amount / this.exchangeRate
    }
  }

  exchangeSomeCurrency(){
    this.exchangerService.getCurrency(this.fromCurrency,this.toCurrency).subscribe(value => {
      this.exchangeRate = value.rates[this.toCurrency]
      this.exchangerCurrency()
    })
  }

  changeFromCurrency(e: any) {
    this.fromCurrency = e.target.value;
    this.exchangeSomeCurrency()
  }

  changeToCurrency(e: any) {
    this.toCurrency = e.target.value;
    this.exchangeSomeCurrency()
  }

  onChangeToAmount(e: any) {
    this.amount = e.target.value;
    this.amountFromCurrency = true;
    this.exchangerCurrency()
  }

  onChangeFromAmount(e: any) {
    this.amount = e.target.value;
    this.amountFromCurrency = false;
    this.exchangerCurrency()
  }
}
