import {inject, Injectable} from "@angular/core";
import {CurrencyDataService} from "../../services/currency-data.service";
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as Data from '../actions/data.actions';
import {catchError, map, of, switchMap, throwError} from "rxjs";

@Injectable()
export class DataEffects {

  private actions$ = inject(Actions);
  private dataService = inject(CurrencyDataService);

  fetchCurrencyDataResponse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(Data.ActionType.FetchDataActionTypeRequest),
      switchMap((request: any) => {
        try {
          return this.dataService.getData(request.filter)
            .pipe(map(response => {
                console.log(response);
                return new Data.FetchDataResponse(response);
              })/*,
              catchError((error) => {
                console.log(error);
                return throwError(() => of(error));
              })*/
            );
        } catch (e: any) {
          console.log(e);
          return of(e);
        }
      }))
  );
}
