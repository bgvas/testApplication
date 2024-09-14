import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-paginator',
  standalone: true,
  imports: [
    MatIcon,
    NgClass
  ],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.scss'
})
export class PaginatorComponent {
  @Input() pageSize!: number;
  @Input() hasNextPage!: boolean;
  @Output() changePage: EventEmitter<number> = new EventEmitter<number>();
  currentPage: number = 1;
  previous: number = 0;
  next: number = 2;


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
