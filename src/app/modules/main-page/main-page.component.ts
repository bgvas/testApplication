import { Component } from '@angular/core';
import {DataFilterComponent} from "../data-filter/data-filter.component";
import {DataTableComponent} from "../data-table/data-table.component";
import {DataChartComponent} from "../data-chart/data-chart.component";
import {
  MatAccordion,
  MatExpansionPanel,
  MatExpansionPanelDescription, MatExpansionPanelHeader,
  MatExpansionPanelTitle
} from "@angular/material/expansion";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [
    DataFilterComponent,
    DataTableComponent,
    DataChartComponent,
    MatExpansionPanel,
    MatExpansionPanelTitle,
    MatExpansionPanelDescription,
    MatExpansionPanelHeader,
    MatAccordion,
    MatIcon
  ],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss'
})
export class MainPageComponent {

}
