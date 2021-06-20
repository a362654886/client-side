import {
  actionBody,
  middleStoreType,
  nextAction,
} from "../../types/MiddleWareType";
import { ADMINISTER_STATE } from "../administerState";
import { LOGIN_USER_ADD } from "../loginUser";

export const loginUserMiddleware =
  (store: middleStoreType) =>
  (next: nextAction) =>
  async (action: actionBody): Promise<void> => {
    next(action);
    if (action.type == LOGIN_USER_ADD) {
      console.log(action.payload)
      store.dispatch({
        payload: action.payload.admin,
        type: ADMINISTER_STATE,
      })
    }
  };
