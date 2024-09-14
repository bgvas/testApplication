import {ApplicationConfig, importProvidersFrom, provideZoneChangeDetection} from '@angular/core';
import {provideRouter, RouterModule} from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {provideHttpClient, withInterceptors} from "@angular/common/http";
import {dataInterceptor} from "./interceptors/data.interceptor";
import {ChartModule} from "angular-highcharts";
import {EffectsModule} from "@ngrx/effects";
import {DataEffects} from "./store/effects/data.effects";
import {StoreModule} from "@ngrx/store";
import {appReducers} from "./store/reducers/app.reducers";
import {ToastrModule} from "ngx-toastr";


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(),
    importProvidersFrom([
      RouterModule.forRoot(routes, {useHash: true}),
      ChartModule,
      ToastrModule.forRoot(),
      StoreModule.forRoot(appReducers),
      EffectsModule.forRoot(
        [DataEffects]
      )
    ]),
    provideHttpClient(
      withInterceptors([
          dataInterceptor
      ])
    ),
  ]
};
