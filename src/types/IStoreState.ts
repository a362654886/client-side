import { Anime } from "./Amine";
import { AwesomeLevelType } from "./awesomeLevel";
import { ReportShowType } from "./blockType";
import { LoadingType, LoginType } from "./EnumTypes";
import { ShowCaseType } from "./showCaseType";
import { User } from "./User";

export interface IStoreState {
  authState: LoginType;
  loginUserState: User | null;
  animeState: Anime | null;
  newState: number | null;
  loadingState: LoadingType;
  mangaState: ShowCaseType | null;
  profileUserState: User | null;
  reportUserState: string | null;
  allLevelState: AwesomeLevelType[] | null;
  reportBlockState: ReportShowType | null;
  adminLoginUserState: User | null;
}
