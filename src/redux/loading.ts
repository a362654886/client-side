import { createReducer } from "./reducers/reducerFn";
import { LoadingType } from "../types/EnumTypes";

//actions

export const LOADING_OPEN = "LOADING_OPEN";
export type LOADING_OPEN = typeof LOADING_OPEN;

export const LOADING_CLOSE = "LOADING_CLOSE";
export type LOADING_CLOSE = typeof LOADING_CLOSE;

export type LoadType = LOADING_OPEN | LOADING_CLOSE;

//action type
export interface LoadingOpenAction {
  payload: LoadingType;
  type: typeof LOADING_OPEN;
}

export interface LoadingCloseAction {
  payload: LoadingType;
  type: typeof LOADING_CLOSE;
}

export type LoadingAction = LoadingOpenAction | LoadingCloseAction;

//action creators
export const actions = {
  loadingOpen: (payload: LoadingType): LoadingOpenAction => ({
    payload,
    type: LOADING_OPEN,
  }),
  authUserLoading: (payload: LoadingType): LoadingCloseAction => ({
    payload,
    type: LOADING_CLOSE,
  }),
};

//reducer
const handlers = {
  LOADING_OPEN: (state: LoadingType, action: LoadingAction) => action.payload,
  LOADING_CLOSE: (state: LoadingType, action: LoadingAction) => action.payload,
};

export const loadingState = (
  state: LoadingType = LoadingType.CLOSE,
  action: LoadingAction
): LoadingType => createReducer<LoadingType>(state, action, handlers);
