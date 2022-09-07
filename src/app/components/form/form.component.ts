import { Component, OnInit } from '@angular/core';
import {ExchangerCurrencyService} from "../../exchanger-currency.service";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  currencies:string[] = [];
  fromCurrency:string = '';
  toCurrency:string = '';

  exchangeRate:number = 0;

  amount:number = 1;
  amountFromCurrency:boolean = true;

  fromAmount:number;
  toAmount:number;

  form:FormGroup;

  constructor(private exchangerService: ExchangerCurrencyService) {
    this.createForm()
  }

  ngOnInit(): void {
    this.exchangerService.getALLCurrencies().subscribe(value => {

      const firstCurrency = Object.keys(value.rates)[0];

      this.currencies = [value.base, ...Object.keys(value.rates)]

      this.fromCurrency = value.base;
      this.toCurrency = firstCurrency

      this.exchangeRate = value.rates[firstCurrency]
    });
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

  createForm():void {
    this.form = new FormGroup({
      currency1 : new FormControl(1),
      currency2 : new FormControl(1),
    })
  }

}
