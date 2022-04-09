import Axios from "axios";
import { backEndLink } from "../globalValues";
import { DesignHistory } from "../types/designHistoryType";

const basicURL = backEndLink;

export const designHistoryGetById = async (
  userId: string,
  page: number,
  pageSize: number
): Promise<{
  designHistories: DesignHistory[];
  count: number;
} | null> => {
  const endpoint =
    basicURL +
    `designHistoryGetById?id=${userId}&page=${page}&pageSize=${pageSize}`;
  return Axios.get(endpoint)
    .then((response) => {
      return response.data;
    })
    .catch(() => {
      return null;
    });
};

export const designHistoryPost = async (
  disHistoryBody: DesignHistory
): Promise<number | null> => {
  const endpoint = basicURL + "designHistoryPost";
  return Axios.post(endpoint, { historyBody: disHistoryBody })
    .then((response) => {
      return response.status;
    })
    .catch(() => {
      return null;
    });
};
