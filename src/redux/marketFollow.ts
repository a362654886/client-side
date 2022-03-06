import { createReducer } from "./reducers/reducerFn";

//actions

export const MARKET_FOLLOW_ARR = "MARKET_FOLLOW_ARR";
export type MARKET_FOLLOW_ARR = typeof MARKET_FOLLOW_ARR;

export type marketFollowType = MARKET_FOLLOW_ARR;

//action type
export interface MarketFollowArrAction {
  payload: string[];
  type: typeof MARKET_FOLLOW_ARR;
}

export type MarketFollowAction = MarketFollowArrAction;

//action creators
export const actions = {
  marketFollowAction: (payload: string[]): MarketFollowArrAction => ({
    payload,
    type: MARKET_FOLLOW_ARR,
  }),
};

//reducer
const handlers = {
  MARKET_FOLLOW_ARR: (state: string[], action: MarketFollowArrAction) =>
    action.payload,
};

export const marketFollowState = (
  state: string[] = [],
  action: MarketFollowAction
): string[] => createReducer<string[]>(state, action, handlers);
