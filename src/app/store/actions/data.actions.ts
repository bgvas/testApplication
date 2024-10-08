import {Action} from '@ngrx/store';
import {DataFilter} from "../../interfaces/data-filter";
import {DataInterface} from "../../interfaces/data.interface";


export enum ActionType {
  FetchDataActionTypeRequest = '[Fetch Data] Fetch Data -> Request',
  FetchDataActionTypeResponse = '[Fetch Data] Fetch Data -> Response',
  FetchDataActionTypeError = '[Fetch Data] Fetch Data -> Error'
}

export class FetchDataRequest implements Action {
  public readonly type = ActionType.FetchDataActionTypeRequest;
  constructor(public filter: DataFilter) { }
}

export class FetchDataResponse implements Action {
  public readonly type = ActionType.FetchDataActionTypeResponse;
  constructor(public response: DataInterface[]) { }
}

export class FetchDataError implements Action {
  public readonly type = ActionType.FetchDataActionTypeError;
  constructor(public response: string) { }
}

export type Actions  = FetchDataRequest | FetchDataResponse | FetchDataError;

