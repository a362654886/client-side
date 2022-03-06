import { combineReducers } from "redux";
import { animeState } from "../anime";
import { authState } from "../auth";
import { loadingState } from "../loading";
import { loginUserState } from "../loginUser";
import { marketFollowState } from "../marketFollow";
import { newState } from "../newBody";
import { profileUserState } from "../profileUser";
import { reportUserState } from "../reportUser";
import { showcaseAwesomeState } from "../showcaseAwesome";
import { mangaState } from "../showcaseManga";

export default combineReducers({
  authState,
  loginUserState,
  animeState,
  newState,
  loadingState,
  mangaState,
  profileUserState,
  showcaseAwesomeState,
  reportUserState,
  marketFollowState,
});
