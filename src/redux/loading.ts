import { createReducer } from "./reducers/reducerFn";
import { BooleanType, LoginType } from "../types/EnumTypes";
import { LoadingPercentageType } from "../types/LoadingType";

//actions

export const LOADING_INI = "LOADING_INI";
export type LOADING_INI = typeof LOADING_INI;

export const LOADING_ADD_TOTAL = "LOADING_ADD_TOTAL";
export type LOADING_ADD_TOTAL = typeof LOADING_ADD_TOTAL;

export const LOADING_ADD_NOW = "LOADING_ADD_NOW";
export type LOADING_ADD_NOW = typeof LOADING_ADD_NOW;

export type LoadingType = LOADING_INI | LOADING_ADD_TOTAL | LOADING_ADD_NOW;

//action type
export interface LoadingIniAction {
  payload: number;
  type: typeof LOADING_INI;
}

export interface LoadingAddTotalAction {
  payload: number;
  type: typeof LOADING_ADD_TOTAL;
}

export interface LoadingAddNumAction {
  payload: number;
  type: typeof LOADING_ADD_NOW;
}

export type LoadingAction =
  | LoadingIniAction
  | LoadingAddTotalAction
  | LoadingAddNumAction;

//action creators
export const actions = {
  LoadingIniAction: (payload: number): LoadingIniAction => ({
    payload,
    type: LOADING_INI,
  }),
  LoadingAddTotalAction: (payload: number): LoadingAddTotalAction => ({
    payload,
    type: LOADING_ADD_TOTAL,
  }),
  LoadingAddNumAction: (payload: number): LoadingAddNumAction => ({
    payload,
    type: LOADING_ADD_NOW,
  }),
};

//reducer
const handlers = {
  LOADING_INI: (state: LoadingPercentageType, action: LoadingAction) => {
    return {
      total: 0,
      now: 0,
    };
  },
  LOADING_ADD_TOTAL: (state: LoadingPercentageType, action: LoadingAction) => {
    const newState = state;
    newState.total = action.payload;
    return newState;
  },
  LOADING_ADD_NOW: (state: LoadingPercentageType, action: LoadingAction) => {
    console.log(action);
    const newState = {
      total: state.total,
      now: action.payload,
    };
    return newState;
  },
};

export const loadingState = (
  state: LoadingPercentageType = {
    total: 0,
    now: 0,
  },
  action: LoadingAction
): LoadingPercentageType =>
  createReducer<LoadingPercentageType>(state, action, handlers);
