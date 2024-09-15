import {
  AfterViewInit,
  Component,
  effect,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  Output,
  SimpleChanges
} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {NgClass, NgIf} from "@angular/common";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {CurrencyDataService} from "../../services/currency-data.service";

@Component({
  selector: 'app-paginator',
  standalone: true,
  imports: [
    MatIcon,
    NgClass,
    MatProgressSpinner,
    NgIf
  ],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.scss'
})
export class PaginatorComponent implements OnChanges{
  @Input() pageSize!: number;
  @Input() hasNextPage!: boolean;
  @Output() changePage: EventEmitter<number> = new EventEmitter<number>();
  @Input() reset!: boolean;
  @Input() isLoading!: boolean;
  currentPage: number = 1;
  previous: number = 0;
  next: number = 2;



  ngOnChanges(changes: SimpleChanges) {
    if (this.reset) {
      this.next = 2;
      this.currentPage = 1;
      this.previous = 0;
      this.changePage.emit(this.currentPage);
    }
  }

  clickedPrevious() {
    if (this.currentPage >= 2) {
       this.next = this.currentPage;
       this.currentPage = this.previous;
       this.previous--;
       this.changePage.emit(this.currentPage);
    }
  }

  clickedNext() {
     if (this.hasNextPage) {
       this.previous = this.currentPage;
       this.currentPage = this.next;
       this.next++;
       this.changePage.emit(this.currentPage);
     }
  }
}
