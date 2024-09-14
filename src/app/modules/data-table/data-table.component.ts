import {AfterViewInit, Component, inject, ViewChild, ViewEncapsulation} from '@angular/core';
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatNoDataRow,
  MatRow,
  MatRowDef,
  MatTable,
  MatTableDataSource
} from "@angular/material/table";
import {MatSort, MatSortHeader} from "@angular/material/sort";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {CurrencyDataService} from "../../services/currency-data.service";
import {DataFilter} from "../../interfaces/data-filter";
import {DataInterface} from "../../interfaces/data.interface";
import {take} from "rxjs";

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [
    MatFormField,
    MatInput,
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatHeaderCellDef,
    MatCellDef,
    MatSort,
    MatHeaderRow,
    MatRow,
    MatHeaderRowDef,
    MatRowDef,
    MatNoDataRow,
    MatPaginator,
    MatLabel,
    MatSortHeader
  ],
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class DataTableComponent implements AfterViewInit{

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource: MatTableDataSource<DataInterface>;
  displayedColumns: string[] = [
    "id",
    "name",
    "symbol",
    "current_price",
    "market_cap",
    "total_volume",
    "high_24h",
    "low_24h",
    "price_change_percentage_24h",
    "circulating_supply"
  ];
  dataService = inject(CurrencyDataService);
  createdFilter: DataFilter = {page: 1, per_page: 10, order: 'id_asc', precision: 2}
  currentPage: number = 0;
  selectedPageSize: number = 10;

  constructor() {
    this.dataSource = new MatTableDataSource();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

    this.dataService.getData(this.createdFilter)
      .pipe(take(1))
      .subscribe(response => this.dataSource.data = response)
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  onPaginatorEvent(pageEvent: PageEvent) {
    this.currentPage = pageEvent.pageIndex;
    this.selectedPageSize = pageEvent.pageSize;
  }
}
