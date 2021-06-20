import { createReducer } from "./reducers/reducerFn";
import { User } from "../types/User";
import { UpdateLabel, UserLabel } from "../types/Label";


//actions

export const LOGIN_USER_NONE = "LOGIN_USER_NONE";
export type LOGIN_USER_NONE = typeof LOGIN_USER_NONE;

export const LOGIN_USER_ADD = "LOGIN_USER_ADD";
export type LOGIN_USER_ADD = typeof LOGIN_USER_ADD;

export const LOGIN_USER_UPDATE_LABELS = "LOGIN_USER_UPDATE_LABELS";
export type LOGIN_USER_UPDATE_LABELS = typeof LOGIN_USER_UPDATE_LABELS;

export type loginUserType =
  | LOGIN_USER_NONE
  | LOGIN_USER_ADD
  | LOGIN_USER_UPDATE_LABELS;

//action type
export interface LoginUserNoneAction {
  payload: null;
  type: typeof LOGIN_USER_NONE;
}

export interface LoginUserAddAction {
  payload: User;
  type: typeof LOGIN_USER_ADD;
}

export interface LoginUserUpdateLabelsAction {
  payload: UserLabel[];
  type: typeof LOGIN_USER_UPDATE_LABELS;
}

export type LoginUser =
  | LoginUserNoneAction
  | LoginUserAddAction
  | LoginUserUpdateLabelsAction;

//action creators
export const actions = {
  loginUserNoneAction: (payload: null): LoginUserNoneAction => ({
    payload,
    type: LOGIN_USER_NONE,
  }),
  loginUserAddAction: (payload: User): LoginUserAddAction => ({
    payload,
    type: LOGIN_USER_ADD,
  }),
  LoginUserUpdateLabelsAction: (payload: UserLabel[]): LoginUserUpdateLabelsAction => ({
    payload,
    type: LOGIN_USER_UPDATE_LABELS,
  })
};

//reducer
const handlers = {
    LOGIN_USER_NONE: (state: User|null, action: LoginUser) => action.payload,
    LOGIN_USER_ADD: (state: User|null, action: LoginUser) => action.payload,
    LOGIN_USER_UPDATE_LABELS: (state: User|null, action: LoginUser) => {
      const loginUser = state as User
      loginUser.labels = action.payload as UserLabel[]
      return loginUser;
    }
};

export const loginUserState = (
  state: User|null = null,
  action: LoginUser
): User|null => createReducer<User|null>(state, action, handlers);