import { createReducer } from "./reducers/reducerFn";
import { Merchandise, MerchandiseReturnBody } from "../types/MerchandiseType";

//actions

export const MERCHANDISE_INI = "MERCHANDISE_INI";
export type MERCHANDISE_INI = typeof MERCHANDISE_INI;

export const MERCHANDISE_ADD = "MERCHANDISE_ADD";
export type MERCHANDISE_ADD = typeof MERCHANDISE_ADD;

export const MERCHANDISE_UPDATE = "MERCHANDISE_UPDATE";
export type MERCHANDISE_UPDATE = typeof MERCHANDISE_UPDATE;

export const MERCHANDISES_UPDATE = "MERCHANDISES_UPDATE";
export type MERCHANDISES_UPDATE = typeof MERCHANDISES_UPDATE;

export type merchandisesType =
  | MERCHANDISE_INI
  | MERCHANDISE_ADD
  | MERCHANDISE_UPDATE
  | MERCHANDISES_UPDATE;

//action type
export interface MerchandiseINIAction {
  payload: MerchandiseReturnBody;
  type: typeof MERCHANDISE_INI;
}

export interface MerchandiseAddAction {
  payload: Merchandise;
  type: typeof MERCHANDISE_ADD;
}

export interface MerchandiseUpdateAction {
  payload: number;
  type: typeof MERCHANDISE_UPDATE;
}

export interface MerchandisesUpdateAction {
  payload: Merchandise[];
  type: typeof MERCHANDISES_UPDATE;
}

export type MerchandiseAction =
  | MerchandiseINIAction
  | MerchandiseAddAction
  | MerchandiseUpdateAction
  | MerchandisesUpdateAction;

//action creators
export const actions = {
  MERCHANDISE_INI: (payload: MerchandiseReturnBody): MerchandiseINIAction => ({
    payload,
    type: MERCHANDISE_INI,
  }),
  MERCHANDISE_ADD: (payload: Merchandise): MerchandiseAddAction => ({
    payload,
    type: MERCHANDISE_ADD,
  }),
  MERCHANDISE_UPDATE: (payload: number): MerchandiseUpdateAction => ({
    payload,
    type: MERCHANDISE_UPDATE,
  }),
  MERCHANDISES_UPDATE: (payload: Merchandise[]): MerchandisesUpdateAction => ({
    payload,
    type: MERCHANDISES_UPDATE,
  }),
};

//reducer
const handlers = {
  MERCHANDISE_INI: (
    state: MerchandiseReturnBody,
    action: MerchandiseINIAction
  ) => {
    console.log(action.payload);
    return action.payload;
  },
  MERCHANDISE_ADD: (
    state: MerchandiseReturnBody,
    action: MerchandiseAddAction
  ) => {
    const newMerchandises = state;
    newMerchandises.merchandises.unshift(action.payload);
    return newMerchandises;
  },
  MERCHANDISE_UPDATE: (
    state: MerchandiseReturnBody,
    action: MerchandiseUpdateAction
  ) => {
    const newMerchandise = state.merchandises[action.payload];
    newMerchandise.like = !newMerchandise.like;
    newMerchandise.likeNum = newMerchandise.like
      ? newMerchandise.likeNum + 1
      : newMerchandise.likeNum - 1;
    const newMerchandiseBody = state;
    newMerchandiseBody.merchandises[action.payload] = newMerchandise;
    console.log(newMerchandiseBody);
    return {
      count: newMerchandiseBody.count,
      merchandises: newMerchandiseBody.merchandises,
    };
  },
  MERCHANDISE_UPDATE_ONE: (
    state: MerchandiseReturnBody,
    action: MerchandisesUpdateAction
  ) => {
    return {
      count: state.count,
      messages: action.payload,
    };
  },
};

export const merchandisesState = (
  state: MerchandiseReturnBody = {
    count: 0,
    merchandises: [],
  },
  action: MerchandiseAction
): MerchandiseReturnBody =>
  createReducer<MerchandiseReturnBody>(state, action, handlers);
