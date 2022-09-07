import { Component, OnInit } from '@angular/core';
import {ExchangerCurrencyService} from "../../exchanger-currency.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  usd:string = '';
  eur:string = '';

  constructor(private exchangerService: ExchangerCurrencyService) { }

  ngOnInit(): void {
    this.exchangerService.getUsdAndEuro('USD').subscribe(value => {
      this.usd = value.rates.UAH.toFixed(2)
    })
    this.exchangerService.getUsdAndEuro('EUR').subscribe(value => {
      this.eur = value.rates.UAH.toFixed(2)
    })
  }

}
