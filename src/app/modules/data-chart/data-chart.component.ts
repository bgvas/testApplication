import {Component, inject, OnDestroy, ViewEncapsulation} from '@angular/core';
import {Chart, ChartModule} from 'angular-highcharts';
import {DataInterface} from "../../interfaces/data.interface";
import {select, Store} from "@ngrx/store";
import {fetchDataSelector, isLoadingSelector} from "../../store/selectors/data.selectors";
import {map, Observable, Subject, takeUntil} from "rxjs";
import {IAppState} from "../../store/states/IAppState";
import {numberFormat} from "highcharts";


@Component({
  selector: 'app-data-chart',
  standalone: true,
  imports: [
    ChartModule
  ],
  templateUrl: './data-chart.component.html',
  styleUrl: './data-chart.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class DataChartComponent implements OnDestroy{

  data$?: Observable<DataInterface[]>;
  isLoading$: Observable<boolean>;
  store = inject(Store<IAppState>);
  chart?: Chart;
  componentHasDestroyed$: Subject<boolean> = new Subject<boolean>();

  constructor() {
    this.store.pipe(select(fetchDataSelector))
      .pipe(map(response => this.getTop10Currencies(response || [])))
      .pipe(map(response => {
        this.chart = new Chart({
          chart: {
            type: 'column'
          },
          title: {
            text: 'Top 10 Cryptocurrencies by Market Capitalization (Per Page)'
          },
          xAxis: {
            categories: response?.map(coin => coin.name),
          },
          yAxis: {
            title: {
              text: 'Market Capitalization'
            }
          },
          series: [
            {
              name: 'Cryptocurrencies',
              type: 'column',
              data: response?.map((coin: DataInterface, index: number) =>  ({
                y: coin.market_cap,
                name: coin.name,
                labelrank: index,
                image: coin.image
              })),
              colorByPoint: true
            },
          ],
          tooltip: {
            useHTML: true,
            formatter() {
              const point: any = this.point;
              return `
                <div style="text-align: center;">
                <img src="${point.options.image}" alt="${point.name}" style="width: 30px; height: 30px;"/><br/>
                <b>${point.name}</b><br/>
                 Market Cap: ${numberFormat(point.y, 0,',','.')} $<br/>
                 Rank in page: ${point.labelrank + 1}
                </div>
              `
            }
          }
        });
        return response;
      }))
      .pipe(takeUntil(this.componentHasDestroyed$))
      .subscribe();

    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
  }

  getTop10Currencies(array: DataInterface[]): DataInterface[] {
    const top10Currencies = [...array].sort((b, a) => a.market_cap - b.market_cap );
    return top10Currencies.splice(0, 10);
  }

  ngOnDestroy() {
    this.componentHasDestroyed$.next(true);
    this.componentHasDestroyed$.unsubscribe();
  }
}
