import {Component, EventEmitter, Output} from '@angular/core';
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [
    MatIcon
  ],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss'
})
export class SearchBarComponent {

  @Output() keyword: EventEmitter<string> = new EventEmitter<string>();

  searchByKeyword(value: string) {
     this.keyword.emit(value);
  }
}
