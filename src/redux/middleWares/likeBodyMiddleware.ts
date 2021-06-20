import { merchandisesUpdate } from "../../api/merchandiseApi";
import { messagesUpdate } from "../../api/messageApPI";
import { postUpdate } from "../../api/postAPI";
import { userLikeBodyUpdate } from "../../api/userLikeAPI";
import { LikeUpdateType } from "../../types/EnumTypes";
import {
  actionBody,
  middleStoreType,
  nextAction,
} from "../../types/MiddleWareType";
import { LikeBody } from "../../types/UserLike";
import {
  LIKE_BODY_INI,
  LIKE_BODY_SEND_MESSAGE,
  LIKE_BODY_SEND_MERCHANDISE,
  LIKE_BODY_UPDATE,
} from "../likeBodyState";
import { MERCHANDISE_UPDATE } from "../merchandises";
import { MESSAGES_UPDATE } from "../messages";
import { POSTS_UPDATE } from "../posts";
/*
    if tap like button, likeBody will be set. Like body is a json data which will send to back-end to update message like num and user's like array 
  */
export const likeBodyMiddleWare =
  (store: middleStoreType) =>
  (next: nextAction) =>
  async (action: actionBody): Promise<void> => {
    next(action);
    const states = store.getState();
    //update like body message
    if (action.type == MESSAGES_UPDATE) {
      console.log(states.likeBodyState);
      const likeBody: LikeBody = {
        like: states.messagesState.messages[action.payload].like as boolean,
        Id: states.messagesState.messages[action.payload].messageId,
      };
      store.dispatch({
        payload: likeBody,
        type: LIKE_BODY_UPDATE,
      });
    }
    //update like body merchandise
    if (action.type == MERCHANDISE_UPDATE) {
      const likeBody: LikeBody = {
        like: states.merchandisesState.merchandises[action.payload]
          .like as boolean,
        Id: states.merchandisesState.merchandises[action.payload]._id,
      };
      store.dispatch({
        payload: likeBody,
        type: LIKE_BODY_UPDATE,
      });
    }
    //update like body post
    if (action.type == POSTS_UPDATE) {
      const likeBody: LikeBody = {
        like: states.postsState[action.payload].like as boolean,
        Id: states.postsState[action.payload]._id,
      };
      //update post
      await postUpdate(states.postsState[action.payload]);
      //update likebody
      if (states.loginUserState) {
        await userLikeBodyUpdate(
          [likeBody],
          states.loginUserState.userEmail,
          LikeUpdateType.POST
        );
      }
    }
    //send likeBody message
    if (action.type == LIKE_BODY_SEND_MESSAGE) {
      if (states.loginUserState) {
        // update messages
        await messagesUpdate(states.messagesState.messages);
        //update like body
        await userLikeBodyUpdate(
          states.likeBodyState,
          states.loginUserState.userEmail,
          LikeUpdateType.MESSAGE
        );
      }
      store.dispatch({
        payload: [],
        type: LIKE_BODY_INI,
      });
    }
    //send likeBody merchandise
    if (action.type == LIKE_BODY_SEND_MERCHANDISE) {
      //update merchandise
      if (states.loginUserState) {
        // update merchandise
        await merchandisesUpdate(states.merchandisesState.merchandises);
        //update like body
        await userLikeBodyUpdate(
          states.likeBodyState,
          states.loginUserState.userEmail,
          LikeUpdateType.MERCHANDISE
        );
      }
      store.dispatch({
        payload: [],
        type: LIKE_BODY_INI,
      });
    }
  };
