import { createReducer } from "./reducers/reducerFn";
import { LikeBody } from "../types/UserLike";

//actions

export const LIKE_BODY_INI = "LIKE_BODY_INI";
export type LIKE_BODY_INI = typeof LIKE_BODY_INI;

export const LIKE_BODY_UPDATE = "LIKE_BODY_UPDATE";
export type LIKE_BODY_UPDATE = typeof LIKE_BODY_UPDATE;

export const LIKE_BODY_SEND_POST = "LIKE_BODY_SEND_POST";
export type LIKE_BODY_SEND_POST = typeof LIKE_BODY_SEND_POST;

export const LIKE_BODY_SEND_MERCHANDISE = "LIKE_BODY_SEND_MERCHANDISE";
export type LIKE_BODY_SEND_MERCHANDISE = typeof LIKE_BODY_SEND_MERCHANDISE;

export const LIKE_BODY_SEND_MESSAGE = "LIKE_BODY_SEND_MESSAGE";
export type LIKE_BODY_SEND_MESSAGE = typeof LIKE_BODY_SEND_MESSAGE;

export type likeBodyType =
  | LIKE_BODY_INI
  | LIKE_BODY_UPDATE
  | LIKE_BODY_SEND_POST
  | LIKE_BODY_SEND_MERCHANDISE
  | LIKE_BODY_SEND_MESSAGE;

//action type
export interface LikeBodyIniAction {
  payload: LikeBody[];
  type: typeof LIKE_BODY_INI;
}

export interface LikeBodyUpdateAction {
  payload: LikeBody;
  type: typeof LIKE_BODY_UPDATE;
}

export interface LikeBodySendPostAction {
  payload: number;
  type: typeof LIKE_BODY_SEND_POST;
}

export interface LikeBodySendMerchandiseAction {
  payload: number;
  type: typeof LIKE_BODY_SEND_MERCHANDISE;
}

export interface LikeBodySendMessageAction {
  payload: number;
  type: typeof LIKE_BODY_SEND_MESSAGE;
}

export type LikeBodyAction =
  | LikeBodyUpdateAction
  | LikeBodyIniAction
  | LikeBodySendPostAction
  | LikeBodySendMerchandiseAction
  | LikeBodySendMessageAction;

//action creators
export const actions = {
  LikeBodyIniAction: (payload: LikeBody[]): LikeBodyIniAction => ({
    payload,
    type: LIKE_BODY_INI,
  }),
  LikeBodyUpdateAction: (payload: LikeBody): LikeBodyUpdateAction => ({
    payload,
    type: LIKE_BODY_UPDATE,
  }),
  //post
  LikeBodySendPostAction: (payload: number): LikeBodySendPostAction => ({
    payload,
    type: LIKE_BODY_SEND_POST,
  }),
  LikeBodySendMerchandiseAction: (
    payload: number
  ): LikeBodySendMerchandiseAction => ({
    payload,
    type: LIKE_BODY_SEND_MERCHANDISE,
  }),
  LikeBodySendMessageAction: (payload: number): LikeBodySendMessageAction => ({
    payload,
    type: LIKE_BODY_SEND_MESSAGE,
  }),
};

//reducer
const handlers = {
  LIKE_BODY_UPDATE: (state: LikeBody[], action: LikeBodyUpdateAction) => {
    const likeBodies: LikeBody[] = state;
    const findIndex = likeBodies.findIndex((x) => (x.Id == action.payload.Id));
    if (findIndex != -1) {
      likeBodies[findIndex] = action.payload;
    } else {
      likeBodies.push(action.payload);
    }
    console.log(likeBodies);
    return likeBodies;
  },
  LIKE_BODY_INI: (state: LikeBody[], action: LikeBodyIniAction) =>
    action.payload,
  LIKE_BODY_SEND_POST: (state: LikeBody[], action: LikeBodySendPostAction) =>
    state,
  LIKE_BODY_SEND_MERCHANDISE: (
    state: LikeBody[],
    action: LikeBodySendMerchandiseAction
  ) => state,
  LIKE_BODY_SEND_MESSAGE: (state: LikeBody[], action: LikeBodyIniAction) =>
    state,
};

export const likeBodyState = (
  state: LikeBody[] = [],
  action: LikeBodyAction
): LikeBody[] => createReducer<LikeBody[]>(state, action, handlers);
