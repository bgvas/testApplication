import {IFetchDataState} from "../states/IData.state";
import {createSelector} from "@ngrx/store";
import {IAppState} from "../states/IAppState";

export const fetchData = (state: IAppState) => state.fetchData;

export const fetchDataSelector = createSelector(
  fetchData,
  (state: IFetchDataState) => state?.dataResponse
)
