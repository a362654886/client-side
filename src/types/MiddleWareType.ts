import {
  $CombinedState,
  CombinedState,
  MiddlewareAPI,
  Store,
} from "@reduxjs/toolkit";
import { AnimeAction } from "../redux/anime";
import { AuthUser } from "../redux/auth";
import { LoginUser } from "../redux/loginUser";
import { User } from "./User";

export type middleStoreType = MiddlewareAPI<
  any,
  { readonly [$CombinedState]?: undefined } & {
    authState: string;
    loginUserState: User | null;
  }
> & { dispatch: unknown };

export type actionBody =
  | AuthUser
  | LoginUser
  | AnimeAction

export type nextAction = (action: actionBody) => void;
