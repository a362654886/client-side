import {
  $CombinedState,
  CombinedState,
  MiddlewareAPI,
  Store,
} from "@reduxjs/toolkit";
import { AdministerAction } from "../redux/administerState";
import { AuthUser } from "../redux/auth";
import { LikeBodyAction } from "../redux/likeBodyState";
import { LoadingAction } from "../redux/loading";
import { LoginUser } from "../redux/loginUser";
import { MerchandiseAction } from "../redux/merchandises";
import { MessagesAction } from "../redux/messages";
import { NewUser, NewUserBody } from "../redux/newUser";
import { PostsAction } from "../redux/posts";
import { BooleanType, LoginType } from "./EnumTypes";
import { MerchandiseReturnBody } from "./MerchandiseType";
import { MessageReturnBody } from "./MessageType";
import { Post } from "./PostType";
import { User } from "./User";
import { LikeBody } from "./UserLike";

export type middleStoreType = MiddlewareAPI<
  any,
  { readonly [$CombinedState]?: undefined } & {
    authState: LoginType;
    newUserState: NewUserBody;
    loginUserState: User | null;
    postsState: Post[];
    messagesState: MessageReturnBody;
    likeBodyState: LikeBody[];
    administerState: BooleanType;
    merchandisesState: MerchandiseReturnBody;
  }
> & { dispatch: unknown };

export type actionBody =
  | AuthUser
  | NewUser
  | LoginUser
  | PostsAction
  | MessagesAction
  | LikeBodyAction
  | AdministerAction
  | MerchandiseAction
  | LoadingAction;

export type nextAction = (action: actionBody) => void;
