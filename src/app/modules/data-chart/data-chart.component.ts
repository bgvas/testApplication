import { Component } from '@angular/core';
import {Chart, ChartModule} from 'angular-highcharts';


@Component({
  selector: 'app-data-chart',
  standalone: true,
  imports: [
    ChartModule
  ],
  templateUrl: './data-chart.component.html',
  styleUrl: './data-chart.component.scss'
})
export class DataChartComponent {

  chart = new Chart({
    chart: {
      type: 'line'
    },
    title: {
      text: 'Market Capitalization'
    },
    series: [
      {
        name: 'Sample',
        type: 'line',
        data: [1, 2, 3, 4, 5]
      }
    ]

  });

}
