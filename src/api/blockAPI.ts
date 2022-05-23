import Axios from "axios";
import { backEndLink } from "../globalValues";
import { ReportShowType, ReportType } from "../types/blockType";

const basicURL = backEndLink;

export const blockInsert = async (
  blockBody: ReportType
): Promise<number | null> => {
  const endpoint = basicURL + `blockInsert`;
  return Axios.post(endpoint, { blockBody: blockBody })
    .then((response) => {
      return response.status;
    })
    .catch(() => {
      return null;
    });
};

export const blockGet = async (
  userId: string,
  page:number
): Promise<{
  result: ReportShowType[];
  count: number;
} | null> => {
  const endpoint = basicURL + `blockGetById?userId=${userId}&page=${page}`;
  return Axios.get(endpoint)
    .then((response) => {
      return response.data;
    })
    .catch(() => {
      return null;
    });
};
