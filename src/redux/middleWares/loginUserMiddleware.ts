import {
  actionBody,
  middleStoreType,
  nextAction,
} from "../../types/MiddleWareType";
import { connection } from "../../websocket/websocketFn";
import { ADMINISTER_STATE } from "../administerState";
import { LOGIN_USER_ADD } from "../loginUser";

export const loginUserMiddleware =
  (store: middleStoreType) =>
  (next: nextAction) =>
  async (action: actionBody): Promise<void> => {
    next(action);
    if (action.type == LOGIN_USER_ADD) {
      store.dispatch({
        payload: action.payload.admin,
        type: ADMINISTER_STATE,
      })
      //connection(action.payload.userEmail, store);
    }
  };
