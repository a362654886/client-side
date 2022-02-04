import Axios from "axios";
import { backEndLink } from "../globalValues";
import { followByType } from "../types/FollowBycopy";
import { MessageType } from "../types/MessageType";
import { Video } from "../types/VideoType";

const basicURL = backEndLink;

export const followByAdd = async (
  followByBody: followByType
): Promise<number | null> => {
  const endpoint = basicURL + "followByInsert";
  return Axios.post(endpoint, { followBy: followByBody })
    .then((response) => {
      return response.status;
    })
    .catch(() => {
      return null;
    });
};

export const followByGetByUserId = async (
  userId: string,
  page: number,
  pageSize: number
): Promise<{
  result: MessageType[];
  count: number;
} | null> => {
  const endpoint =
    basicURL +
    `followByGetByUserId?userId=${userId}&page=${page}&pageSize=${pageSize}`;
  return Axios.get(endpoint)
    .then((response) => {
      return response.data;
    })
    .catch(() => {
      return null;
    });
};

export const followByDelete = async (id: string): Promise<number | null> => {
  const endpoint = basicURL + `followByDelete?id=${id}`;
  return Axios.delete(endpoint)
    .then((response) => {
      return response.status;
    })
    .catch(() => {
      return null;
    });
};
