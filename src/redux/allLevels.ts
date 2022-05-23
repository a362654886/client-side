import { createReducer } from "./reducers/reducerFn";
import { User } from "../types/User";
import { AwesomeLevelType } from "../types/awesomeLevel";

//actions

export const ALL_LEVELS_NONE = "ALL_LEVELS_NONE";
export type ALL_LEVELS_NONE = typeof ALL_LEVELS_NONE;

export const ALL_LEVELS_UPDATE = "ALL_LEVELS_UPDATE";
export type ALL_LEVELS_UPDATE = typeof ALL_LEVELS_UPDATE;

export type allLevelsType = ALL_LEVELS_NONE | ALL_LEVELS_UPDATE;

//action type
export interface AllLevelNoneAction {
  payload: null;
  type: typeof ALL_LEVELS_NONE;
}

export interface AllLevelUpdateAction {
  payload: AwesomeLevelType[];
  type: typeof ALL_LEVELS_UPDATE;
}

export type AllLevel = AllLevelNoneAction | AllLevelUpdateAction;

//action creators
export const actions = {
  AllLevelNoneAction: (payload: null): AllLevelNoneAction => ({
    payload,
    type: ALL_LEVELS_NONE,
  }),
  AllLevelUpdateAction: (
    payload: AwesomeLevelType[]
  ): AllLevelUpdateAction => ({
    payload,
    type: ALL_LEVELS_UPDATE,
  }),
};

//reducer
const handlers = {
  ALL_LEVELS_NONE: (state: AwesomeLevelType[] | null, action: AllLevel) => null,
  ALL_LEVELS_UPDATE: (state: AwesomeLevelType[] | null, action: AllLevel) =>
    action.payload,
};

export const allLevelState = (
  state: AwesomeLevelType[] | null = null,
  action: AllLevel
): AwesomeLevelType[] | null =>
  createReducer<AwesomeLevelType[] | null>(state, action, handlers);
