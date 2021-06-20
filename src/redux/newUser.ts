import { createReducer } from "./reducers/reducerFn";
import { NewUserType } from "../types/EnumTypes";
import { User } from "../types/User";

//payload TYPE

export type NewUserBody = {
  state: NewUserType;
  user: User | null;
};

//actions

export const NEW_USER_NONE = "NEW_USER_NONE";
export type NEW_USER_NONE = typeof NEW_USER_NONE;

export const NEW_USER_LOADING = "NEW_USER_LOADING";
export type NEW_USER_LOADING = typeof NEW_USER_LOADING;

export const NEW_USER_SUCCESS = "NEW_USER_SUCCESS";
export type NEW_USER_SUCCESS = typeof NEW_USER_SUCCESS;

export const NEW_USER_FAIL = "NEW_USER_FAIL";
export type NEW_USER_FAIL = typeof NEW_USER_FAIL;

export const NEW_USER_BACK = "NEW_USER_BACK";
export type NEW_USER_BACK = typeof NEW_USER_BACK;

export type newUserType =
  | NEW_USER_NONE
  | NEW_USER_LOADING
  | NEW_USER_SUCCESS
  | NEW_USER_FAIL
  | NEW_USER_BACK;

//action type
export interface NewUserNoneAction {
  payload: NewUserBody;
  type: typeof NEW_USER_NONE;
}

export interface NewUserLoadingAction {
  payload: NewUserBody;
  type: typeof NEW_USER_LOADING;
}

export interface NewUserSuccessAction {
  payload: NewUserBody;
  type: typeof NEW_USER_SUCCESS;
}

export interface NewUserFailAction {
  payload: NewUserBody;
  type: typeof NEW_USER_FAIL;
}

export interface NewUserBackAction {
  payload: NewUserBody;
  type: typeof NEW_USER_BACK;
}

export type NewUser =
  | NewUserNoneAction
  | NewUserLoadingAction
  | NewUserSuccessAction
  | NewUserFailAction
  | NewUserBackAction;

//action creators
export const actions = {
  newUserNoneAction: (payload: NewUserBody): NewUserNoneAction => ({
    payload,
    type: NEW_USER_NONE,
  }),
  newUserLoadingAction: (payload: NewUserBody): NewUserLoadingAction => ({
    payload,
    type: NEW_USER_LOADING,
  }),
  newUserSuccessAction: (payload: NewUserBody): NewUserSuccessAction => ({
    payload,
    type: NEW_USER_SUCCESS,
  }),
  newUserFailAction: (payload: NewUserBody): NewUserFailAction => ({
    payload,
    type: NEW_USER_FAIL,
  }),
  newUserBackAction: (payload: NewUserBody): NewUserBackAction => ({
    payload,
    type: NEW_USER_BACK,
  }),
};

//reducer
const handlers = {
  NEW_USER_NONE: (state: NewUserBody, action: NewUser) => action.payload,
  NEW_USER_LOADING: (state: NewUserBody, action: NewUser) => action.payload,
  NEW_USER_SUCCESS: (state: NewUserBody, action: NewUser) => action.payload,
  NEW_USER_FAIL: (state: NewUserBody, action: NewUser) => action.payload,
  NEW_USER_BACK: (state: NewUserBody, action: NewUser) => action.payload,
};

export const newUserState = (
  state: NewUserBody = {
    state: NewUserType.NONE,
    user: null,
  },
  action: NewUser
): NewUserBody => createReducer<NewUserBody>(state, action, handlers);
