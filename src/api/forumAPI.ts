import Axios from "axios";
import { backEndLink } from "../globalValues";
import { ForumItem, ForumType } from "../types/forumType";

const basicURL = backEndLink;

export const forumAdd = async (
  forumBody: ForumType
): Promise<number | null> => {
  const endpoint = basicURL + "forumInsert";
  return Axios.post(endpoint, { forum: forumBody })
    .then((response) => {
      return response.status;
    })
    .catch(() => {
      return null;
    });
};

export const forumItemAdd = async (
  forumItemBody: ForumItem
): Promise<number | null> => {
  const endpoint = basicURL + "forumItemInsert";
  return Axios.post(endpoint, { forumItem: forumItemBody })
    .then((response) => {
      return response.status;
    })
    .catch(() => {
      return null;
    });
};

export const forumsAllGet = async (
  anime: string,
  page: number,
  pageSize: number
): Promise<{
  result: ForumType[];
  count: number;
} | null> => {
  const endpoint =
    basicURL + `forumsGet?animeId=${anime}&page=${page}&pageSize=${pageSize}`;
  return Axios.get(endpoint)
    .then((response) => {
      return response.data;
    })
    .catch(() => {
      return null;
    });
};
