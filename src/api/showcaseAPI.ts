import Axios from "axios";
import { backEndLink } from "../globalValues";
import { ShowCaseReply, ShowCaseType } from "../types/showCaseType";

const basicURL = backEndLink;

export const showCaseAdd = async (
  showcaseBody: ShowCaseType
): Promise<number | null> => {
  const endpoint = basicURL + "showCaseInsert";
  return Axios.post(endpoint, { showCase: showcaseBody })
    .then((response) => {
      return response.status;
    })
    .catch(() => {
      return null;
    });
};

export const showCaseReplyAdd = async (
  showCaseReplyBody: ShowCaseReply
): Promise<number | null> => {
  const endpoint = basicURL + "showCaseReplyInsert";
  return Axios.post(endpoint, { showCaseReply: showCaseReplyBody })
    .then((response) => {
      return response.status;
    })
    .catch(() => {
      return null;
    });
};

export const showCaseAllGet = async (
  page: number,
  pageSize: number
): Promise<{
  result: ShowCaseType[];
  count: number;
} | null> => {
  const endpoint = basicURL + `showCasesGet?page=${page}&pageSize=${pageSize}`;
  return Axios.get(endpoint)
    .then((response) => {
      return response.data;
    })
    .catch(() => {
      return null;
    });
};
