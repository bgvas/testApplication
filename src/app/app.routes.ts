import { Routes } from '@angular/router';
import {DataTableComponent} from "./modules/data-table/data-table.component";
import {MainPageComponent} from "./modules/main-page/main-page.component";
import {EntranceComponent} from "./modules/entrance/entrance.component";

export const routes: Routes = [
  {path: '', pathMatch: "full", redirectTo: '/entrance'},
  {path: 'main', component: MainPageComponent},
  {path: 'entrance', component: EntranceComponent}
];
