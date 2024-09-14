import {AfterViewInit, Component, inject, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
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
import {DataFilter} from "../../interfaces/data-filter";
import {DataInterface} from "../../interfaces/data.interface";
import {catchError, map, Observable, take, throwError} from "rxjs";
import {Store, select} from "@ngrx/store";
import {IAppState} from "../../store/states/IAppState";
import {FetchDataRequest} from "../../store/actions/data.actions";
import {fetchDataSelector} from "../../store/selectors/data.selectors";
import {ToastrService} from "ngx-toastr";
import {AsyncPipe, NgIf} from "@angular/common";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {PaginatorComponent} from "../paginator/paginator.component";

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
    MatSortHeader,
    AsyncPipe,
    NgIf,
    MatProgressSpinner,
    PaginatorComponent,
  ],
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class DataTableComponent implements AfterViewInit, OnInit{

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
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
  createdFilter: DataFilter = {page: 1, per_page: 250, order: 'market_cap_desc'}
  currentPage: number = 0;
  previousPage: number = 0;
  fetchedResults: number = 0;
  nextPage: number = 1;
  store = inject(Store<IAppState>);
  data$: Observable<DataInterface[]>;
  isLoading: boolean = false;
  toastr = inject(ToastrService);
  hasNextPage: boolean = false;
  pageSize = 250;

  constructor() {
    this.data$ = this.store.pipe(select(fetchDataSelector))
      .pipe(catchError(error => {
        this.isLoading = false;
        this.toastr.error(error.error);
        return throwError(() => error);
      }))
      .pipe(map(response => {
        this.isLoading = false;
        this.hasNextPage = !(response?.length < this.pageSize);
        return response;
      }))
  }

  ngAfterViewInit() {
    /* When you change the sorting, you return to the first page */
     this.sort.sortChange
       .pipe(take(1))
       .subscribe(() => (this.paginator.pageIndex = 0));
  }


  ngOnInit() {
    this.nextPage = 1;
    this.fetchData({page: 1, per_page: 250, order: 'market_cap_desc'});
  }

  applyFilter(event: Event) {
   /* const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }*/
  }

  onPaginatorEvent(pageEvent: PageEvent) {

   /* this.currentPage = pageEvent.pageIndex;
    this.selectedPageSize = pageEvent.pageSize;*/

  }

  fetchData(filter: DataFilter) {
    if (filter) {
      this.isLoading = true;
      this.store.dispatch(new FetchDataRequest(filter));
    }
  }

  onPageChange(page: number) {
      this.currentPage = page;
      this.createdFilter = {...this.createdFilter, page: this.currentPage};
      this.fetchData(this.createdFilter);
  }
}
