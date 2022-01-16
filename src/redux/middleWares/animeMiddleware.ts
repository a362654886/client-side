import { animeUpdateLike } from "../../api/animeAPI";
import { userUpdateFollowUsers, userUpdateLike } from "../../api/userApi";
import {
  actionBody,
  middleStoreType,
  nextAction,
} from "../../types/MiddleWareType";
import { ANIME_UPDATE_LIKE } from "../anime";

export const animeMiddleware =
  (store: middleStoreType) =>
  (next: nextAction) =>
  async (action: actionBody): Promise<void> => {
    next(action);
    if (action.type == ANIME_UPDATE_LIKE) {
      const anime = store.getState().animeState;
      if (anime) {
        await animeUpdateLike(anime._id, anime.likes);
      }
    }
  };
