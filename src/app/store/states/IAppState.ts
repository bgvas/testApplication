import {FetchDataInitialState, IFetchDataState} from "./IData.state";

export interface IAppState {
  fetchData: IFetchDataState;
}

export const initialAppState: IAppState = {
  fetchData: FetchDataInitialState
}
