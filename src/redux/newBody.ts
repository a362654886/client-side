
import { createReducer } from "./reducers/reducerFn";

//actions

export const NEW_NONE = "NEW_NONE";
export type NEW_NONE = typeof NEW_NONE;

export const NEW_ADD = "NEW_ADD";
export type NEW_ADD = typeof NEW_ADD;

export type NEWType = NEW_ADD | NEW_NONE;

//action type
export interface NewNoneAction {
  payload: null;
  type: typeof NEW_NONE;
}

export interface NewAddAction {
  payload: number;
  type: typeof NEW_ADD;
}
export type NewAction = NewNoneAction | NewAddAction;

//action creators
export const actions = {
  newNoneAction: (payload: null): NewNoneAction => ({
    payload,
    type: NEW_NONE,
  }),
  newAddAction: (payload: number): NewAddAction => ({
    payload,
    type: NEW_ADD,
  }),
};

//reducer
const handlers = {
  NEW_NONE: (state: number | null, action: NewNoneAction) => action.payload,
  NEW_ADD: (state: number | null, action: NewAddAction) => action.payload
};

export const newState = (
  state: number | null = null,
  action: NewAction
): number | null => createReducer<number | null>(state, action, handlers);
