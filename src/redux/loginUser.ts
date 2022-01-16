import { createReducer } from "./reducers/reducerFn";
import { User } from "../types/User";
import { cloneDeep } from "lodash";

//actions

export const LOGIN_USER_NONE = "LOGIN_USER_NONE";
export type LOGIN_USER_NONE = typeof LOGIN_USER_NONE;

export const LOGIN_USER_ADD = "LOGIN_USER_ADD";
export type LOGIN_USER_ADD = typeof LOGIN_USER_ADD;

export const LOGIN_USER_UPDATE_LABELS = "LOGIN_USER_UPDATE_LABELS";
export type LOGIN_USER_UPDATE_LABELS = typeof LOGIN_USER_UPDATE_LABELS;

export const LOGIN_USER_UPDATE_FOLLOW = "LOGIN_USER_UPDATE_FOLLOW";
export type LOGIN_USER_UPDATE_FOLLOW = typeof LOGIN_USER_UPDATE_FOLLOW;

export const LOGIN_USER_UPDATE_LIKE = "LOGIN_USER_UPDATE_LIKE";
export type LOGIN_USER_UPDATE_LIKE = typeof LOGIN_USER_UPDATE_LIKE;

export type loginUserType =
  | LOGIN_USER_NONE
  | LOGIN_USER_ADD
  | LOGIN_USER_UPDATE_LABELS
  | LOGIN_USER_UPDATE_FOLLOW
  | LOGIN_USER_UPDATE_LIKE;

//action type
export interface LoginUserNoneAction {
  payload: null;
  type: typeof LOGIN_USER_NONE;
}

export interface LoginUserAddAction {
  payload: User;
  type: typeof LOGIN_USER_ADD;
}

export interface LoginUserUpdateFollowAction {
  payload: string;
  type: typeof LOGIN_USER_UPDATE_FOLLOW;
}

export interface LoginUserUpdateLikeAction {
  payload: string;
  type: typeof LOGIN_USER_UPDATE_LIKE;
}

export type LoginUser =
  | LoginUserNoneAction
  | LoginUserAddAction
  | LoginUserUpdateFollowAction
  | LoginUserUpdateLikeAction;

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
  loginUserUpdateFollowAction: (
    payload: string
  ): LoginUserUpdateFollowAction => ({
    payload,
    type: LOGIN_USER_UPDATE_FOLLOW,
  }),
  LoginUserUpdateLikeAction: (
    payload: string
  ): LoginUserUpdateLikeAction => ({
    payload,
    type: LOGIN_USER_UPDATE_LIKE,
  }),
};

//reducer
const handlers = {
  LOGIN_USER_NONE: (state: User | null, action: LoginUser) => action.payload,
  LOGIN_USER_ADD: (state: User | null, action: LoginUser) => {
    const newUser = Object.assign({}, action.payload);
    return newUser;
  },
  LOGIN_USER_UPDATE_FOLLOW: (
    state: User | null,
    action: LoginUserUpdateFollowAction
  ) => {
    const newUser = cloneDeep(state);
    if (newUser && newUser.followUsers) {
      const followArr = newUser.followUsers;
      const index = followArr.indexOf(action.payload);
      if (index == -1) {
        followArr.push(action.payload);
      } else {
        followArr.splice(index, 1);
      }
      newUser.followUsers = followArr;
    }
    return newUser;
  },
  LOGIN_USER_UPDATE_LIKE: (
    state: User | null,
    action: LoginUserUpdateLikeAction
  ) => {
    const newUser = cloneDeep(state);
    if (newUser && newUser.likeAnime) {
      const likeArr = newUser.likeAnime;
      const index = likeArr.indexOf(action.payload);
      if (index == -1) {
        likeArr.push(action.payload);
      } else {
        likeArr.splice(index, 1);
      }
      newUser.likeAnime = likeArr;
    }
    return newUser;
  }
};

export const loginUserState = (
  state: User | null = null,
  action: LoginUser
): User | null => createReducer<User | null>(state, action, handlers);
