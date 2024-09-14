import {inject, Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {MainHelper} from "../helpers/main.helper";
import {DataInterface} from "../interfaces/data.interface";
import {DataFilter} from "../interfaces/data-filter";

@Injectable({
  providedIn: 'root'
})
export class CurrencyDataService {


  mainUrl = environment.apiUrl;
  http = inject(HttpClient);


  constructor() { }

  getData(filter: DataFilter): Observable<DataInterface[]> {
    /*const params = MainHelper.convertToHttpParams(filter);
    return this.http.get<DataInterface[]>(this.mainUrl, {params});*/

    return of([
      {
        id: 'AAA',
        name: 'AAA',
        symbol: 'aaa',
        current_price: 100000,
        market_cap: 100000,
        total_volume: 100000,
        high_24h: 1000000,
        low_24h: 1000000,
        price_change_percentage_24h: 123,
        circulating_supply: 123
      },
      {
        id: 'BBB',
        name: 'BBB',
        symbol: 'bbb',
        current_price: 100000,
        market_cap: 100000,
        total_volume: 100000,
        high_24h: 1000000,
        low_24h: 1000000,
        price_change_percentage_24h: 123,
        circulating_supply: 123
      },
      {
        id: 'CCC',
        name: 'CCC',
        symbol: 'ccc',
        current_price: 100000,
        market_cap: 100000,
        total_volume: 100000,
        high_24h: 1000000,
        low_24h: 1000000,
        price_change_percentage_24h: 123,
        circulating_supply: 123
      },
      {
        id: 'DDD',
        name: 'DDD',
        symbol: 'ddd',
        current_price: 100000,
        market_cap: 100000,
        total_volume: 100000,
        high_24h: 1000000,
        low_24h: 1000000,
        price_change_percentage_24h: 123,
        circulating_supply: 123
      },
      {
        id: 'EEE',
        name: 'EEE',
        symbol: 'eee',
        current_price: 100000,
        market_cap: 100000,
        total_volume: 100000,
        high_24h: 1000000,
        low_24h: 1000000,
        price_change_percentage_24h: 123,
        circulating_supply: 123
      },
      {
        id: 'FFF',
        name: 'FFF',
        symbol: 'fff',
        current_price: 100000,
        market_cap: 100000,
        total_volume: 100000,
        high_24h: 1000000,
        low_24h: 1000000,
        price_change_percentage_24h: 123,
        circulating_supply: 123
      },
      {
        id: 'GGG',
        name: 'GGG',
        symbol: 'ggg',
        current_price: 100000,
        market_cap: 100000,
        total_volume: 100000,
        high_24h: 1000000,
        low_24h: 1000000,
        price_change_percentage_24h: 123,
        circulating_supply: 123
      },
      {
        id: 'HHH',
        name: 'HHH',
        symbol: 'hhh',
        current_price: 100000,
        market_cap: 100000,
        total_volume: 100000,
        high_24h: 1000000,
        low_24h: 1000000,
        price_change_percentage_24h: 123,
        circulating_supply: 123
      }
    ]);
  }

}
