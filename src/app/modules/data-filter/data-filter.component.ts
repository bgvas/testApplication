import {Component, EventEmitter, inject, Output, ViewEncapsulation} from '@angular/core';
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {NgClass} from "@angular/common";
import {DataFilter} from "../../interfaces/data-filter";

@Component({
  selector: 'app-data-filter',
  standalone: true,
  imports: [
    MatFormField,
    MatInput,
    MatLabel,
    MatButton,
    ReactiveFormsModule,
    NgClass
  ],
  templateUrl: './data-filter.component.html',
  styleUrl: './data-filter.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class DataFilterComponent {

  form: FormGroup;
  fb = inject(FormBuilder);
  @Output() filterData: EventEmitter<DataFilter | null> = new EventEmitter<DataFilter | null>();

  constructor() {
    this.form = this.fb.group({
      name: [null],
      symbol: [null],
      market_cap: [null]
    })
  }

  onSearch() {
    const filter: DataFilter = {
      name: this.form.get('name')?.getRawValue(),
      symbol: this.form.get('symbol')?.getRawValue(),
      market_cap: this.form.get('market_cap')?.getRawValue()
    };

    this.filterData.emit(filter);
  }

  onClear() {
     this.form.reset();
     this.filterData.emit(null);
  }

}
