import {HttpParams} from "@angular/common/http";
import {Sort} from "@angular/material/sort";
import {DataInterface} from "../interfaces/data.interface";
import {Data} from "@angular/router";


export class MainHelper {

  public static convertToHttpParams(object: any): HttpParams {
    let params = new HttpParams();
    for (const param in object) {
      params = params.append(param, object[param]);
    }
    return params;
  }

  public static sortDataInterfaceArray(sort: Sort, array: DataInterface[]): DataInterface[] {

    /* Bypass the 'read only array' error */
    const newArray = array.slice();
    return newArray.sort((a, b) => {
      if (sort.direction === 'asc') {
        // @ts-ignore
        if (a[sort.active] > b[sort.active]) {
          return 1;
          // @ts-ignore
        } else if (a[sort.active] < b[sort.active]) {
          return -1;
        } else {
          return 0;
        }
      } else {
        // @ts-ignore
        if (a[sort.active] > b[sort.active]) {
          return -1;
          // @ts-ignore
        } else if (a[sort.active] < b[sort.active]) {
          return 1;
        } else {
          return 0;
        }
      }
    })
  }
}
