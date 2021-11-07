import { combineReducers } from "redux";
import { animeState } from "../anime";
import { authState } from "../auth";
import { loginUserState } from "../loginUser";

export default combineReducers({
  authState,
  loginUserState,
  animeState
});
