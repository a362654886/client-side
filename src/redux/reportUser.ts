import { createReducer } from "./reducers/reducerFn";

//actions

export const REPORT_USER_NONE = "REPORT_USER_NONE";
export type REPORT_USER_NONE = typeof REPORT_USER_NONE;

export const REPORT_USER_UPDATE = "REPORT_USER_UPDATE";
export type REPORT_USER_UPDATE = typeof REPORT_USER_UPDATE;

export type reportUserType = REPORT_USER_NONE | REPORT_USER_UPDATE;

//action type
export interface ReportNoneAction {
  payload: null;
  type: typeof REPORT_USER_NONE;
}

export interface ReportUpdateAction {
  payload: string;
  type: typeof REPORT_USER_UPDATE;
}

export type ReportUser = ReportNoneAction | ReportUpdateAction;

//action creators
export const actions = {
  ReportNoneAction: (payload: null): ReportNoneAction => ({
    payload,
    type: REPORT_USER_NONE,
  }),
  ReportUpdateAction: (payload: string): ReportUpdateAction => ({
    payload,
    type: REPORT_USER_UPDATE,
  }),
};

//reducer
const handlers = {
  REPORT_USER_NONE: (state: string | null, action: ReportUser) => null,
  REPORT_USER_UPDATE: (state: string | null, action: ReportUser) => {
    const reportUserId = action.payload;
    return reportUserId;
  },
};

export const reportUserState = (
  state: string | null = null,
  action: ReportUser
): string | null => createReducer<string | null>(state, action, handlers);
