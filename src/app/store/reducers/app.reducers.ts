import {ActionReducerMap} from "@ngrx/store";
import {IAppState} from "../states/IAppState";
import {fetchDataReducers} from "./data.reducers";

export const appReducers: ActionReducerMap<IAppState, any> = {
  fetchData: fetchDataReducers
}
