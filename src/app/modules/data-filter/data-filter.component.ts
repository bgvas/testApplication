import {Component, ViewEncapsulation} from '@angular/core';
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-data-filter',
  standalone: true,
  imports: [
    MatFormField,
    MatInput,
    MatLabel,
    MatButton
  ],
  templateUrl: './data-filter.component.html',
  styleUrl: './data-filter.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class DataFilterComponent {

  applyFilter(selectedFilter: KeyboardEvent) {

  }
}
