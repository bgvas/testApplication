import {Component, ViewEncapsulation} from '@angular/core';
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";

@Component({
  selector: 'app-data-filter',
  standalone: true,
    imports: [
        MatFormField,
        MatInput,
        MatLabel
    ],
  templateUrl: './data-filter.component.html',
  styleUrl: './data-filter.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class DataFilterComponent {

  applyFilter(selectedFilter: KeyboardEvent) {

  }
}
