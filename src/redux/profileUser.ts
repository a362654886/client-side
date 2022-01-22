import { createReducer } from "./reducers/reducerFn";
import { User } from "../types/User";

//actions

export const PROFILE_USER_NONE = "PROFILE_USER_NONE";
export type PROFILE_USER_NONE = typeof PROFILE_USER_NONE;

export const PROFILE_USER_UPDATE = "PROFILE_USER_UPDATE";
export type PROFILE_USER_UPDATE = typeof PROFILE_USER_UPDATE;

export type profileUserType = PROFILE_USER_NONE | PROFILE_USER_UPDATE;

//action type
export interface ProfileNoneAction {
  payload: null;
  type: typeof PROFILE_USER_NONE;
}

export interface ProfileUpdateAction {
  payload: User;
  type: typeof PROFILE_USER_UPDATE;
}

export type ProfileUser = ProfileNoneAction | ProfileUpdateAction;

//action creators
export const actions = {
  ProfileNoneAction: (payload: null): ProfileNoneAction => ({
    payload,
    type: PROFILE_USER_NONE,
  }),
  ProfileUpdateAction: (payload: User): ProfileUpdateAction => ({
    payload,
    type: PROFILE_USER_UPDATE,
  }),
};

//reducer
const handlers = {
  PROFILE_USER_NONE: (state: User | null, action: ProfileUser) => null,
  PROFILE_USER_UPDATE: (state: User | null, action: ProfileUser) => {
    const profileUser = Object.assign({}, action.payload);
    return profileUser;
  },
};

export const profileUserState = (
  state: User | null = null,
  action: ProfileUser
): User | null => createReducer<User | null>(state, action, handlers);
