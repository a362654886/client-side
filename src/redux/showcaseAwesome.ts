import { createReducer } from "./reducers/reducerFn";
import { ShowCaseType } from "../types/showCaseType";

//actions

export const SHOWCASE_AWESOME_ADD = "SHOWCASE_AWESOME_ADD";
export type SHOWCASE_AWESOME_ADD = typeof SHOWCASE_AWESOME_ADD;

export const SHOWCASE_AWESOME_CANCEL = "SHOWCASE_AWESOME_CANCEL";
export type SHOWCASE_AWESOME_CANCEL = typeof SHOWCASE_AWESOME_CANCEL;

export type showcaseAwesomeType =
  | SHOWCASE_AWESOME_ADD
  | SHOWCASE_AWESOME_CANCEL;

//action type
export interface ShowcaseAwesomeAddAction {
  payload: ShowCaseType;
  type: typeof SHOWCASE_AWESOME_ADD;
}

export interface ShowcaseAwesomeCancelAction {
  payload: ShowCaseType;
  type: typeof SHOWCASE_AWESOME_CANCEL;
}
export type ShowcaseAwesomeAction =
  | ShowcaseAwesomeAddAction
  | ShowcaseAwesomeCancelAction;

//action creators
export const actions = {
  ShowcaseAwesomeAddAction: (
    payload: ShowCaseType
  ): ShowcaseAwesomeAddAction => ({
    payload,
    type: SHOWCASE_AWESOME_ADD,
  }),
  ShowcaseAwesomeCancelAction: (
    payload: ShowCaseType
  ): ShowcaseAwesomeCancelAction => ({
    payload,
    type: SHOWCASE_AWESOME_CANCEL,
  }),
};

//reducer
const handlers = {
  SHOWCASE_AWESOME_ADD: (
    state: ShowCaseType | null,
    action: ShowcaseAwesomeAddAction
  ) => action.payload,
  SHOWCASE_AWESOME_CANCEL: (
    state: ShowCaseType | null,
    action: ShowcaseAwesomeCancelAction
  ) => action.payload,
};

export const showcaseAwesomeState = (
  state: ShowCaseType | null = null,
  action: ShowcaseAwesomeAction
): ShowCaseType | null =>
  createReducer<ShowCaseType | null>(state, action, handlers);
