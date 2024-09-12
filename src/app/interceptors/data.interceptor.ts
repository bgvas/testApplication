import { HttpInterceptorFn } from '@angular/common/http';
import {environment} from "../../environments/environment";

export const dataInterceptor: HttpInterceptorFn = (req, next) => {

  const apiKeyTitle = environment.apiKeyHeader;
  const apikey = environment.coinGeckoApiKey;

  const systemRequest = req.clone({
    setParams: {
      [apiKeyTitle]: apikey
    }
  });

  return next(systemRequest)
};
