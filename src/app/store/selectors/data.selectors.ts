import {IFetchDataState} from "../states/IData.state";
import {createSelector} from "@ngrx/store";
import {IAppState} from "../states/IAppState";

export const fetchData = (state: IAppState) => state.fetchData;

export const isLoadingSelector = createSelector(
  fetchData,
  (state: IFetchDataState) => state?.isLoading
)

export const errorSelector = createSelector(
  fetchData,
  (state: IFetchDataState) => state?.error
)

export const fetchDataSelector = createSelector(
  fetchData,
  (state: IFetchDataState) => state?.dataResponse
)
