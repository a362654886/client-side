import { createReducer } from "./reducers/reducerFn";
import { LoginType } from "../types/EnumTypes";

//actions

export const AUTH_START = "AUTH_START";
export type AUTH_START = typeof AUTH_START;

export const AUTH_LOADING = "AUTH_LOADING";
export type AUTH_LOADING = typeof AUTH_LOADING;

export const AUTH_SUCCESS = "AUTH_SUCCESS";
export type AUTH_SUCCESS = typeof AUTH_SUCCESS;

export const AUTH_FAIL = "AUTH_FAIL";
export type AUTH_FAIL = typeof AUTH_FAIL;

export type authType = AUTH_START | AUTH_LOADING | AUTH_SUCCESS | AUTH_FAIL;

//action type
export interface AuthStartAction {
  payload: LoginType;
  type: typeof AUTH_START;
}

export interface AuthLoadingAction {
  payload: LoginType;
  type: typeof AUTH_LOADING;
}

export interface AuthSuccessAction {
  payload: LoginType;
  type: typeof AUTH_SUCCESS;
}

export interface AuthFailAction {
  payload: LoginType;
  type: typeof AUTH_FAIL;
}

export type AuthUser =
  | AuthStartAction
  | AuthLoadingAction
  | AuthSuccessAction
  | AuthFailAction;

//action creators
export const actions = {
  authUserIni: (payload: LoginType): AuthStartAction => ({
    payload,
    type: AUTH_START,
  }),
  authUserLoading: (payload: LoginType): AuthLoadingAction => ({
    payload,
    type: AUTH_LOADING,
  }),
  authUserSuccess: (payload: LoginType): AuthSuccessAction => ({
    payload,
    type: AUTH_SUCCESS,
  }),
  authUserFail: (payload: LoginType): AuthFailAction => ({
    payload,
    type: AUTH_FAIL,
  }),
};

//reducer
const handlers = {
  AUTH_START: (state: LoginType, action: AuthUser) => action.payload,
  AUTH_LOADING: (state: LoginType, action: AuthUser) => action.payload,
  AUTH_SUCCESS: (state: LoginType, action: AuthUser) => action.payload,
  AUTH_FAIL: (state: LoginType, action: AuthUser) => action.payload,
};

export const authState = (
  state: LoginType = LoginType.AUTHORIZATION,
  action: AuthUser
): LoginType => createReducer<LoginType>(state, action, handlers);
