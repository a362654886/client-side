import { NewUserBody } from "../redux/newUser";
import { BooleanType, LoginType } from "./EnumTypes";
import { LoadingPercentageType } from "./LoadingType";
import { MerchandiseReturnBody } from "./MerchandiseType";
import { MessageReturnBody } from "./MessageType";
import { Post } from "./PostType";
import { User } from "./User";
import { LikeBody } from "./UserLike";

export interface IStoreState {
  authState: LoginType;
  newUserState: NewUserBody;
  loginUserState: User | null;
  postsState: Post[];
  messagesState: MessageReturnBody;
  likeBodyState: LikeBody[];
  administerState: BooleanType;
  merchandisesState: MerchandiseReturnBody;
  loadingState: LoadingPercentageType;
}
