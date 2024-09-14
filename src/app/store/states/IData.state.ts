import {DataInterface} from "../../interfaces/data.interface";

export interface IFetchDataState {
  dataResponse: DataInterface[];
}

export const FetchDataInitialState: IFetchDataState = {
 dataResponse: []
};
