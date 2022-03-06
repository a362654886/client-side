import { $CombinedState, MiddlewareAPI } from "@reduxjs/toolkit";
import { AnimeAction } from "../redux/anime";
import { AuthUser } from "../redux/auth";
import { LoadingAction } from "../redux/loading";
import { LoginUser } from "../redux/loginUser";
import { MarketFollowAction } from "../redux/marketFollow";
import { NewAction } from "../redux/newBody";
import { ProfileUser } from "../redux/profileUser";
import { ReportUser } from "../redux/reportUser";
import { ShowcaseAwesomeAction } from "../redux/showcaseAwesome";
import { ShowcaseAction } from "../redux/showcaseManga";
import { Anime } from "./Amine";
import { ShowCaseType } from "./showCaseType";
import { User } from "./User";

export type middleStoreType = MiddlewareAPI<
  any,
  { readonly [$CombinedState]?: undefined } & {
    authState: string;
    loginUserState: User | null;
    animeState: Anime | null;
    showcaseAwesomeState: ShowCaseType | null;
    marketFollowState: string[];
  }
> & { dispatch: unknown };

export type actionBody =
  | AuthUser
  | LoginUser
  | AnimeAction
  | NewAction
  | LoadingAction
  | ShowcaseAction
  | ProfileUser
  | ShowcaseAwesomeAction
  | ReportUser
  | MarketFollowAction;

export type nextAction = (action: actionBody) => void;
