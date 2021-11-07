import { Anime } from "./Amine";
import { LoginType } from "./EnumTypes";
import { User } from "./User";

export interface IStoreState {
  authState: LoginType;
  loginUserState: User | null;
  animeState: Anime | null;
}