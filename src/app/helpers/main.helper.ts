import {HttpParams} from "@angular/common/http";

export class MainHelper {

  public static convertToHttpParams(object: any): HttpParams {
    let params = new HttpParams();
    for (const param in object) {
      params = params.append(param, object[param]);
    }
    return params;
  }


}
