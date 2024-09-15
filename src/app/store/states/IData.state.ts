import {DataInterface} from "../../interfaces/data.interface";

export interface IFetchDataState {
  dataResponse: DataInterface[];
  isLoading: boolean;
  error: string | null;
}

export const FetchDataInitialState: IFetchDataState = {
  dataResponse: [],
  isLoading: false,
  error: null
};
