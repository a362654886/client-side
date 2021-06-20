import Axios from "axios";
import { backEndLink } from "../globalValues";
import { LikeUpdateType } from "../types/EnumTypes";
import { LikeBody} from "../types/UserLike";

const basicURL = backEndLink;

export const userLikeAdd = async (newEmail: string): Promise<string | null> => {
  const endpoint = basicURL + "userLikeInsert";
  return Axios.post(endpoint, {
    userEmail: newEmail,
  })
    .then(() => {
      return "success";
    })
    .catch(() => {
      return null;
    });
};

export const userLikeBodyUpdate = async (
  userLikeBody: LikeBody[],
  userEmail: string,
  type:LikeUpdateType
): Promise<string | null> => {
  const endpoint = basicURL + "userLikeBodiesUpdate";
  return Axios.put(endpoint, {
    userLikeBodies: userLikeBody,
    userEmail: userEmail,
    Type: type
  })
    .then(() => {
      return "success";
    })
    .catch(() => {
      return null;
    });
};