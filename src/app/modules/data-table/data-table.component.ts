import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
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
import {MatSort, MatSortHeader, Sort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {DataFilter} from "../../interfaces/data-filter";
import {DataInterface} from "../../interfaces/data.interface";
import {map, Observable, Subject, takeUntil} from "rxjs";
import {select, Store} from "@ngrx/store";
import {IAppState} from "../../store/states/IAppState";
import {FetchDataRequest} from "../../store/actions/data.actions";
import {fetchDataSelector, isLoadingSelector} from "../../store/selectors/data.selectors";
import {AsyncPipe, DecimalPipe, NgClass, NgIf} from "@angular/common";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {PaginatorComponent} from "../paginator/paginator.component";
import {MainHelper} from "../../helpers/main.helper";

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
export class DataTableComponent implements AfterViewInit, OnInit, OnDestroy, OnChanges{

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @Output() data: EventEmitter<DataInterface[]> = new EventEmitter<DataInterface[]>();
  @Input() selectedFilter!: DataFilter | null;
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
  currentPage: number = 0;
  store = inject(Store<IAppState>);
  data$: Observable<DataInterface[]>;
  isLoading$: Observable<boolean>;
  hasNextPage: boolean = false;
  pageSize = 250;
  defaultOrder = 'market_cap_desc';
  resetPaginator: boolean = false;
  componentIsDestroyed$: Subject<boolean> = new Subject<boolean>();
  changeDetector = inject(ChangeDetectorRef);
  createdFilter: DataFilter = {page: 1, per_page: this.pageSize, order: this.defaultOrder}


  constructor() {
    this.data$ = this.store.pipe(select(fetchDataSelector))
      .pipe(map(response => {
        this.hasNextPage = !(response?.length < this.pageSize);
        return response;
      }))

    this.isLoading$ = this.store.pipe(select(isLoadingSelector));

  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.selectedFilter) {
      this.filterDataTable();
    }
    else  {
     this.resetFilteredTable();
    }
  }


  ngAfterViewInit() {
     this.onShortChange();
  }

  ngOnInit() {
    this.fetchData({page: 1, per_page: this.pageSize, order: this.defaultOrder});
  }

  onShortChange() {
    this.sort?.sortChange
      .pipe(takeUntil(this.componentIsDestroyed$))
      .subscribe(sorting => {
       this.changeSortingOfDataTable(sorting);
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

  changeSortingOfDataTable(sorting: Sort) {
    if (sorting.direction === '') {
      this.data$ = this.data$ = this.store.pipe(select(fetchDataSelector))
        .pipe(map(response => {
          this.hasNextPage = !(response?.length < this.pageSize);
          return response;
        }))
    } else {
      this.data$ = this.data$.pipe(map(coins => {
        return MainHelper.sortDataInterfaceArray(sorting, coins);
      }));
    }
  }

  filterDataTable() {
     this.data$ = this.data$.pipe(map(coins => {
       if (this.selectedFilter?.name) {
         coins = coins.filter(coin => coin.name === this.selectedFilter?.name);
       }
       if (this.selectedFilter?.symbol) {
         coins = coins.filter(coin => coin.symbol === this.selectedFilter?.symbol);
       }
       if (this.selectedFilter?.market_cap) {
         coins = coins.filter(coin => coin.market_cap === this.selectedFilter?.market_cap);
       }

       return coins;
     }));
  }

  resetFilteredTable() {
    this.data$ = this.store.pipe(select(fetchDataSelector))
      .pipe(map(response => {
        this.hasNextPage = !(response?.length < this.pageSize);
        return response;
      }))
  }

  ngOnDestroy() {
    this.componentIsDestroyed$.next(true);
    this.componentIsDestroyed$.unsubscribe();
  }
}
