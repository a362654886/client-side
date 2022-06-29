import { createReducer } from "./reducers/reducerFn";
import { User } from "../types/User";
import { cloneDeep } from "lodash";

//actions

export const ADMIN_LOGIN_USER_NONE = "ADMIN_LOGIN_USER_NONE";
export type ADMIN_LOGIN_USER_NONE = typeof ADMIN_LOGIN_USER_NONE;

export const ADMIN_LOGIN_USER_ADD = "ADMIN_LOGIN_USER_ADD";
export type ADMIN_LOGIN_USER_ADD = typeof ADMIN_LOGIN_USER_ADD;

export type adminLoginUserType = ADMIN_LOGIN_USER_NONE | ADMIN_LOGIN_USER_ADD;

//action type
export interface AdminLoginUserNoneAction {
  payload: null;
  type: typeof ADMIN_LOGIN_USER_NONE;
}

export interface AdminLoginUserAddAction {
  payload: User;
  type: typeof ADMIN_LOGIN_USER_ADD;
}

export type AdminLoginUser = AdminLoginUserNoneAction | AdminLoginUserAddAction;

//action creators
export const actions = {
  AdminLoginUserNoneAction: (payload: null): AdminLoginUserNoneAction => ({
    payload,
    type: ADMIN_LOGIN_USER_NONE,
  }),
  AdminLoginUserAddAction: (payload: User): AdminLoginUserAddAction => ({
    payload,
    type: ADMIN_LOGIN_USER_ADD,
  }),
};

//reducer
const handlers = {
  ADMIN_LOGIN_USER_NONE: (state: User | null, action: AdminLoginUser) =>
    action.payload,
  ADMIN_LOGIN_USER_ADD: (state: User | null, action: AdminLoginUser) => {
    const newUser = cloneDeep(action.payload);
    return newUser;
  },
};

export const adminLoginUserState = (
  state: User | null = null,
  action: AdminLoginUser
): User | null => createReducer<User | null>(state, action, handlers);
