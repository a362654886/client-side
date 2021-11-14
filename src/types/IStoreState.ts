import { Anime } from "./Amine";
import { LoadingType, LoginType } from "./EnumTypes";
import { NewType } from "./NewsType";
import { User } from "./User";

export interface IStoreState {
  authState: LoginType;
  loginUserState: User | null;
  animeState: Anime | null;
  newState: NewType | null;
  loadingState: LoadingType;
}