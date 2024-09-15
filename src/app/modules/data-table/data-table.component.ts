import {
  AfterViewInit,
  ChangeDetectorRef,
  Component, EventEmitter,
  inject,
  OnDestroy,
  OnInit, Output,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
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
  MatTable
} from "@angular/material/table";
import {MatSort, MatSortHeader} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {DataFilter} from "../../interfaces/data-filter";
import {DataInterface} from "../../interfaces/data.interface";
import {catchError, map, Observable, of, Subject, take, takeUntil, throwError} from "rxjs";
import {Store, select} from "@ngrx/store";
import {IAppState} from "../../store/states/IAppState";
import {FetchDataRequest} from "../../store/actions/data.actions";
import {
  fetchDataSelector,
  isLoadingSelector
} from "../../store/selectors/data.selectors";
import {AsyncPipe, DecimalPipe, NgClass, NgIf} from "@angular/common";
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
    DecimalPipe,
    NgClass,
  ],
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class DataTableComponent implements AfterViewInit, OnInit, OnDestroy{

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @Output() data: EventEmitter<DataInterface[]> = new EventEmitter<DataInterface[]>();
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
  store = inject(Store<IAppState>);
  data$: Observable<DataInterface[]>;
  isLoading$: Observable<boolean>;
  hasNextPage: boolean = false;
  pageSize = 250;
  resetPaginator: boolean = false;
  componentIsDestroyed$: Subject<boolean> = new Subject<boolean>();
  changeDetector = inject(ChangeDetectorRef);


  constructor() {
    this.data$ = this.store.pipe(select(fetchDataSelector))
      .pipe(map(response => {
        this.hasNextPage = !(response?.length < this.pageSize);
        return response;
      }))

    this.isLoading$ = this.store.pipe(select(isLoadingSelector));

  }

  ngAfterViewInit() {
     this.onShortChange();
  }

  ngOnInit() {
    this.fetchData({page: 1, per_page: 250, order: 'market_cap_desc'});
  }

  onShortChange() {
    /* When you change the sorting, you return to the first page */
    this.sort?.sortChange
      .pipe(takeUntil(this.componentIsDestroyed$))
      .subscribe(sorting => {
        this.createdFilter = {...this.createdFilter, page: 1, order: sorting.active + '_' + sorting.direction};
        this.resetPaginator = true;
      });
  }

  fetchData(filter: DataFilter) {
    if (filter) {
      this.store.dispatch(new FetchDataRequest(filter));
      this.changeDetector.detectChanges();
    }
  }

  onPageChange(page: number) {
      this.resetPaginator = false;
      this.currentPage = page;
      this.createdFilter = {...this.createdFilter, page: this.currentPage};
      this.fetchData(this.createdFilter);
  }

  ngOnDestroy() {
    this.componentIsDestroyed$.next(true);
    this.componentIsDestroyed$.unsubscribe();
  }

}
