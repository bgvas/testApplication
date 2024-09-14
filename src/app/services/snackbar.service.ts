import {inject, Injectable, signal} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  private _snackBar = inject(MatSnackBar);
  private duration = 1500;


  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, 'X',
      {
        duration: this.duration,
        horizontalPosition: 'right',
        verticalPosition: 'top',
        panelClass: 'error-snackbar'
      });
  }


}
