import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ExchangerCurrencyService} from "../../services/exchanger-currency.service";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit,AfterViewInit  {

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

  createForm():void {
    this.form = new FormGroup({
      inputFromAmount : new FormControl(),
      inputToAmount : new FormControl(),
      selectFromAmount: new FormControl('EUR'),
      selectToAmount:new FormControl('AUD')
    })
  }

  ngAfterViewInit(): void {
   this.form.get('inputFromAmount')?.valueChanges.subscribe(data => {
     this.amount = data;
     this.amountFromCurrency = true;
     this.exchangerCurrency()
   })
    this.form.get('inputToAmount')?.valueChanges.subscribe(data => {
      this.amount = data
      this.amountFromCurrency = false;
      this.exchangerCurrency()
    })

    this.form.get('selectFromAmount')?.valueChanges.subscribe(data =>{
      this.fromCurrency = data
      this.exchangeSomeCurrency()
    })

    this.form.get('selectToAmount')?.valueChanges.subscribe(data =>{
      this.toCurrency = data
      this.exchangeSomeCurrency()
    })
  }

}
