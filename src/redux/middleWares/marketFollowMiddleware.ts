import { userUpdateMarket } from "../../api/userApi";
import {
  actionBody,
  middleStoreType,
  nextAction,
} from "../../types/MiddleWareType";
import { MARKET_FOLLOW_ARR } from "../marketFollow";

export const marketFollowMiddleware =
  (store: middleStoreType) =>
  (next: nextAction) =>
  async (action: actionBody): Promise<void> => {
    next(action);
    if (action.type == MARKET_FOLLOW_ARR) {
      const loginUser = store.getState().loginUserState;
      const marketFollowArr = store.getState().marketFollowState;
      if (marketFollowArr && loginUser) {
        await userUpdateMarket(loginUser._id, marketFollowArr);
      }
    }
  };
