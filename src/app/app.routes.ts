import { Routes } from '@angular/router';
import {DataTableComponent} from "./modules/data-table/data-table.component";
import {MainPageComponent} from "./modules/main-page/main-page.component";

export const routes: Routes = [
  {path: '', pathMatch: "full", redirectTo: '/main'},
  {path: 'main', component: MainPageComponent}
];
