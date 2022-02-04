import Axios from "axios";
import { backEndLink } from "../globalValues";
import { Avatar } from "../types/User";

const basicURL = backEndLink;

export const avatarAdd = async (avatar: Avatar): Promise<number | null> => {
  const endpoint = basicURL + "avatarInsert";
  return Axios.post(endpoint, { avatar: avatar })
    .then((response) => {
      return response.status;
    })
    .catch(() => {
      return null;
    });
};

export const avatarsGet = async (): Promise<Avatar[] | null> => {
  const endpoint = basicURL + "avatarsGet";
  return Axios.get(endpoint)
    .then((response) => {
      return response.data;
    })
    .catch(() => {
      return null;
    });
};

export const avatarDelete = async (
  avatarId: string
): Promise<number | null> => {
  const endpoint = basicURL + `avatarDelete?avatarId=${avatarId}`;
  return Axios.delete(endpoint)
    .then((response) => {
      return response.status;
    })
    .catch(() => {
      return null;
    });
};
