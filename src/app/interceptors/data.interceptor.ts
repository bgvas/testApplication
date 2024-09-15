import { HttpInterceptorFn } from '@angular/common/http';
import {environment} from "../../environments/environment";
import {catchError, throwError} from "rxjs";
import {inject} from "@angular/core";
import {SnackbarService} from "../services/snackbar.service";

export const dataInterceptor: HttpInterceptorFn = (req, next) => {

  const apiKeyTitle = environment.apiKeyHeader;
  const apikey = environment.coinGeckoApiKey;
  const snackbar = inject(SnackbarService);

  const systemRequest = req.clone({
    setParams: {
      [apiKeyTitle]: apikey
    }
  });

  /*  General Error Handling  */
  return next(systemRequest)
    .pipe(catchError(error => {
      if (error.status >= 500) {
        snackbar.openSnackBar('Internal server error', 'error');
      } else if (error.status === 429) {
        snackbar.openSnackBar('Too many requests. Try again in a few seconds', 'error');
      } else if (error.status === 400) {
        snackbar.openSnackBar('There is an error in your request. Please check and try again.', 'error');
      } else if (error.status === 401) {
        snackbar.openSnackBar('Unauthorized', 'error');
      } else if (error.status === 404) {
        snackbar.openSnackBar('Nothing found', 'error');
      } else if (error.status === 10020) {
        snackbar.openSnackBar('Access denied', 'error');
      } else if (error.status === 0) {
        snackbar.openSnackBar('Too many requests. Try again in a few seconds', 'error');
      } else {
        snackbar.openSnackBar('Unknown error', 'error');
      }

      return throwError(() => error);
    }))

};
