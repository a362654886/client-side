import { createReducer } from "./reducers/reducerFn";
import { BooleanType, LoginType } from "../types/EnumTypes";

//actions

export const ADMINISTER_STATE = "ADMINISTER_STATE";
export type ADMINISTER_STATE = typeof ADMINISTER_STATE;

export type AdministerType = ADMINISTER_STATE;

//action type
export interface AdministerStateAction {
  payload: boolean;
  type: typeof ADMINISTER_STATE;
}

export type AdministerAction = AdministerStateAction;

//action creators
export const actions = {
  AdministerStateAction: (payload: boolean): AdministerAction => ({
    payload,
    type: ADMINISTER_STATE,
  }),
};

//reducer
const handlers = {
  ADMINISTER_STATE: (state: BooleanType, action: AdministerAction) => {
    console.log(action)
    if(action.payload == true){
      return BooleanType.SUCCESS
    }else{
      return BooleanType.FAIL
    }
  },
};

export const administerState = (
  state: BooleanType = BooleanType.FAIL,
  action: AdministerAction
): BooleanType => createReducer<BooleanType>(state, action, handlers);
