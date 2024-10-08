import {
  FetchDataInitialState,
  IFetchDataState
} from "../states/IData.state";
import * as Data from '../actions/data.actions';
import {ActionType} from "../actions/data.actions";

export function fetchDataReducers(state: IFetchDataState = FetchDataInitialState, action: Data.Actions): IFetchDataState {
  switch (action.type) {
    case ActionType.FetchDataActionTypeRequest: {
      return {
        ...state,
        isLoading: true
      }
    }
    case ActionType.FetchDataActionTypeResponse: {
      return {
        ...state,
        dataResponse: action.response,
        isLoading: false
      }
    }
    case ActionType.FetchDataActionTypeError: {
      return {
        ...state,
        error: action.response,
        isLoading: false
      }
    }
    default:
      return state;
  }
}
