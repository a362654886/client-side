import { combineReducers } from "redux";
import { animeState } from "../anime";
import { authState } from "../auth";
import { loadingState } from "../loading";
import { loginUserState } from "../loginUser";
import { newState } from "../newBody";

export default combineReducers({
  authState,
  loginUserState,
  animeState,
  newState,
  loadingState
});
