import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-entrance',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './entrance.component.html',
  styleUrl: './entrance.component.scss'
})
export class EntranceComponent {

}
