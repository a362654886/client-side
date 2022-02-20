import { showCaseAwesomeUpdate } from "../../api/showcaseAPI";
import { userUpdateAwesome, userUpdateShowcases } from "../../api/userApi";
import {
  actionBody,
  middleStoreType,
  nextAction,
} from "../../types/MiddleWareType";
import {
  SHOWCASE_AWESOME_ADD,
  SHOWCASE_AWESOME_CANCEL,
} from "../showcaseAwesome";

export const showcaseAwesomeMiddleware =
  (store: middleStoreType) =>
  (next: nextAction) =>
  async (action: actionBody): Promise<void> => {
    next(action);
    if (action.type == (SHOWCASE_AWESOME_ADD || SHOWCASE_AWESOME_CANCEL)) {
      const loginUser = store.getState().loginUserState;
      const showcase = store.getState().showcaseAwesomeState;
      if (showcase && loginUser) {
        await showCaseAwesomeUpdate(showcase._id, showcase.aweSome);
        await userUpdateShowcases(loginUser._id, loginUser.likeShowcase);
        await userUpdateAwesome(
          showcase.userId,
          action.type == SHOWCASE_AWESOME_ADD ? true : false
        );
      }
    }
  };
