import { combineReducers } from "redux";
import { authState } from "../auth";
import { loginUserState } from "../loginUser";

export default combineReducers({
  authState,
  loginUserState,
});
