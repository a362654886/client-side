import { combineReducers } from "redux";
import { authState } from "../auth";
import { newUserState } from "../newUser";
import { loginUserState } from "../loginUser";
import { postsState } from "../posts";
import { messagesState } from "../messages";
import { likeBodyState } from "../likeBodyState";
import { administerState } from "../administerState";
import { merchandisesState } from "../merchandises";

export default combineReducers({
  authState,
  newUserState,
  loginUserState,
  postsState,
  messagesState,
  likeBodyState,
  administerState,
  merchandisesState
});
