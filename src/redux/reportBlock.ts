import { cloneDeep } from "lodash";
import { ReportShowType } from "../types/blockType";
import { createReducer } from "./reducers/reducerFn";

//actions

export const REPORT_BLOCK_NONE = "REPORT_BLOCK_NONE";
export type REPORT_BLOCK_NONE = typeof REPORT_BLOCK_NONE;

export const REPORT_BLOCK_UPDATE = "REPORT_BLOCK_UPDATE";
export type REPORT_BLOCK_UPDATE = typeof REPORT_BLOCK_UPDATE;

export type reportBlockType = REPORT_BLOCK_NONE | REPORT_BLOCK_UPDATE;

//action type
export interface ReportBlockNoneAction {
  payload: null;
  type: typeof REPORT_BLOCK_NONE;
}

export interface ReportBlockUpdateAction {
  payload: ReportShowType;
  type: typeof REPORT_BLOCK_UPDATE;
}

export type ReportBlock = ReportBlockNoneAction | ReportBlockUpdateAction;

//action creators
export const actions = {
  ReportBlockNoneAction: (payload: null): ReportBlockNoneAction => ({
    payload,
    type: REPORT_BLOCK_NONE,
  }),
  ReportBlockUpdateAction: (
    payload: ReportShowType
  ): ReportBlockUpdateAction => ({
    payload,
    type: REPORT_BLOCK_UPDATE,
  }),
};

//reducer
const handlers = {
  REPORT_BLOCK_NONE: (state: string | null, action: ReportBlock) => null,
  REPORT_BLOCK_UPDATE: (state: string | null, action: ReportBlock) => {
    const reportUserId = cloneDeep(action.payload);
    return reportUserId;
  },
};

export const reportBlockState = (
  state: ReportShowType | null = null,
  action: ReportBlock
): ReportShowType | null =>
  createReducer<ReportShowType | null>(state, action, handlers);
