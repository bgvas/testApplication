import {ApplicationConfig, importProvidersFrom, provideZoneChangeDetection} from '@angular/core';
import {provideRouter, RouterModule} from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {provideHttpClient, withInterceptors} from "@angular/common/http";
import {dataInterceptor} from "./interceptors/data.interceptor";
import {ChartModule} from "angular-highcharts";


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(),
    importProvidersFrom([
      RouterModule.forRoot(routes, {useHash: true}),
      ChartModule
    ]),
    provideHttpClient(
      withInterceptors([
          dataInterceptor
      ])
    ),
  ]
};
