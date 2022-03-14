import Axios from "axios";
import { backEndLink } from "../globalValues";
import { followByType } from "../types/FollowBycopy";
import { MessageType } from "../types/MessageType";

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
  pageSize: number,
  type: number
): Promise<{
  result: followByType[];
  count: number;
} | null> => {
  const endpoint =
    basicURL +
    `followByGetByUserId?userId=${userId}&page=${page}&pageSize=${pageSize}&type=${type}`;
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
