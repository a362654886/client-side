import { userUpdateFollowUsers, userUpdateLike } from "../../api/userApi";
import {
  actionBody,
  middleStoreType,
  nextAction,
} from "../../types/MiddleWareType";
import { ANIME_UPDATE_LIKE } from "../anime";
import {
  LOGIN_USER_ADD,
  LOGIN_USER_UPDATE_FOLLOW,
  LOGIN_USER_UPDATE_LIKE,
} from "../loginUser";

export const loginUserMiddleware =
  (store: middleStoreType) =>
  (next: nextAction) =>
  async (action: actionBody): Promise<void> => {
    next(action);
    if (action.type == LOGIN_USER_UPDATE_FOLLOW) {
      const loginUser = store.getState().loginUserState;
      if (loginUser) {
        await userUpdateFollowUsers(
          loginUser._id,
          loginUser.followUsers,
          action.payload
        );
        /*const arr = loginUser.followUsers;
        arr.push(action.payload);
        loginUser.followUsers = arr;
        store.dispatch({
          payload: loginUser,
          type: LOGIN_USER_ADD,
        });*/
      }
    }

    if (action.type == LOGIN_USER_UPDATE_LIKE) {
      const loginUser = store.getState().loginUserState;
      if (loginUser) {
        await userUpdateLike(loginUser._id, loginUser.likeAnime);
        const likeArr = loginUser.likeAnime;
        const exist = likeArr.indexOf(action.payload);
        store.dispatch({
          payload: exist == -1 ? -1 : 1,
          type: ANIME_UPDATE_LIKE,
        });
      }
    }
  };
