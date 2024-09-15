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
import {SearchBarComponent} from "../search-bar/search-bar.component";
import {DataFilter} from "../../interfaces/data-filter";

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
    MatIcon,
    SearchBarComponent
  ],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss'
})
export class MainPageComponent {

  selectedFilter: DataFilter | null = null;

  getSelectedFilter(filter: DataFilter | null) {
        this.selectedFilter = filter;
  }
}
