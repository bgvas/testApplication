import {DataInterface} from "../../interfaces/data.interface";

export interface IFetchDataState {
  dataResponse: DataInterface[];
  isLoading: boolean;
}

export const FetchDataInitialState: IFetchDataState = {
  dataResponse: [],
  isLoading: false
};
