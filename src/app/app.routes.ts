import { Routes } from '@angular/router';
import {DataTableComponent} from "./modules/data-table/data-table.component";

export const routes: Routes = [
  {path: '', pathMatch: "full", redirectTo: '/main'},
  {path: 'main', component: DataTableComponent}
];
