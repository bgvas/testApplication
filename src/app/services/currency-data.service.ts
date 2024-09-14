import {inject, Injectable, signal} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {MainHelper} from "../helpers/main.helper";

@Injectable({
  providedIn: 'root'
})
export class CurrencyDataService {


  mainUrl = environment.apiUrl;
  http = inject(HttpClient);
  private resetPaginator = signal<boolean>(false);



  getData(filter: any): Observable<any[]> {
    const params = MainHelper.convertToHttpParams(filter);
    return this.http.get<any>(this.mainUrl, {params});
  }

  resetCurrentPageIndex(value: boolean) {
    this.resetPaginator.set(value);
  }

  checkIfCurrentPageHasBeenReset() {
    return this.resetPaginator();
  }

}
