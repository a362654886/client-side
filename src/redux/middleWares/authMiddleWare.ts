import { userLikeAdd } from "../../api/userLikeAPI";
import {
  actionBody,
  middleStoreType,
  nextAction,
} from "../../types/MiddleWareType";
import { NEW_USER_SUCCESS } from "../newUser";

export const useLikeAddMiddleWare =
  (store: middleStoreType) =>
  (next: nextAction) =>
  async (action: actionBody): Promise<void> => {
    next(action);
    if (action.type == NEW_USER_SUCCESS) {
      if (action.payload.user?.userEmail) {
        await userLikeAdd(action.payload.user?.userEmail);
      }
    }
  };
